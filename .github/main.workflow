workflow "Build and run checks" {
  on = "pull_request"
  resolves = ["Run type-check"]
}

action "Install deps" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Run type-check" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install deps"]
  args = "run type:check"
}
