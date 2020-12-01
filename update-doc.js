const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");

const methods = {};

const { testResults } = JSON.parse(
  execSync("npm --silent test -- --json", { stdio: "pipe" }).toString()
);

for (const { assertionResults } of testResults) {
  const name = assertionResults[0].ancestorTitles[0];
  methods[name] = assertionResults.map((a) => a.title);
}

let doc = "";

for (const name of Object.keys(methods).sort()) {
  let source = readFileSync("./src/" + name + ".ts").toString();
  let index = source.indexOf("function " + name);
  let signature = "";
  let depth = 0;
  for (const char of source.slice(index)) {
    signature += char;
    if (char === "(") {
      ++depth;
    } else if (char === ")") {
      if (--depth === 0) {
        break;
      }
    }
  }
  index += signature.length;
  for (const char of source.slice(index)) {
    signature += char;
    if (char === "<") {
      ++depth;
    } else if (char === ">") {
      if (--depth === 0) {
        break;
      }
    }
  }

  signature = signature.replace(new RegExp(name + "<[^>]+>"), name);

  doc += "### " + name.replace(/^v/, "") + "\n\n";
  doc += "```ts\n" + signature + "\n```\n\n";
  for (const spec of methods[name]) {
    doc += "- This checker " + spec + "\n";
  }
  doc += "\n";
}

const README = "./README.md";
const BEGIN_DOC = "<!-- BEGIN DOC -->";
const END_DOC = "<!-- END DOC -->";
writeFileSync(
  README,
  readFileSync(README)
    .toString()
    .replace(
      new RegExp(BEGIN_DOC + ".+" + END_DOC, "s"),
      BEGIN_DOC + "\n\n" + doc + END_DOC
    )
);
