module.exports = {
  checkBundleSize: () => {
    const fs = require('fs');
    const jsonString = fs.readFileSync('.github/analyze/bundles.json');
    const data = JSON.parse(jsonString);
    const pagesToCheck = [
      '/',
      '/cli/start/install',
      '/lib/auth/getting-started/q/platform/[platform]',
      '/start',
      '/cli'
    ];
    const bundleSizes = [];
    data.pages.filter((page) => {
      if (pagesToCheck.includes(page.label)) {
        bundleSizes.push({
          page: page.label,
          gzipSize: page.gzipSize,
          parsedSize: page.parsedSize,
          statSize: page.statSize,
          totalGzipSize: page.totalGzipSize,
          totalParsedSize: page.totalParsedSize,
          totalStatSize: page.totalStatSize
        });
      }
    });
    return bundleSizes;
  },

  compareBundles: (baseBundles, headBundles) => {
    baseBundles.forEach((basePage) => {
      headBundles.forEach((headPage) => {
        if (
          basePage.page == headPage.page &&
          basePage.parsedSize * 1.05 < headPage.parsedSize
        ) {
          const log = `The bundle size of ${basePage.page} increased by more than 5% with this PR`;
          console.log(
            basePage.page,
            ': ',
            basePage.parsedSize,
            headPage.page,
            ': ',
            headPage.parsedSize,
            basePage.page == headPage.page,
            basePage.parsedSize * 1.05 < headPage.parsedSize
          );
          console.log(log);
          return true;
        }
      });
    });
  }
};
