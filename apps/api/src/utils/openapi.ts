import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export function loadOpenApiSpec() {
  const filePath = path.resolve(process.cwd(), "../../docs/openapi.yaml");
  const raw = fs.readFileSync(filePath, "utf8");
  return YAML.parse(raw);
}
