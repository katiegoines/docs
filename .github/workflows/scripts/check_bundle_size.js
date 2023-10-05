module.exports = {
  checkBundleSize: ({ github, context, core }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    const fs = require('fs');
    const jsonString = fs.readFileSync('.github/analyze/bundles.json');
    const data = JSON.parse(jsonString);
    const filtered = data.pages.filter((page) => {
      console.log(page);
    });
    // console.log(filtered);
  }
};
