module.exports = {
  getBaseBundleSizes: ({ github, context, core }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    const fs = require('fs');
    const jsonString = fs.readFileSync('../../analyze/bundles.json');
    const data = JSON.parse(jsonString);
  }
};
