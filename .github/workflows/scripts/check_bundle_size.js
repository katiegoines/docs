module.exports = {
  checkBaseBundleSize: () => {
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
    const baseBundleSizes = [];
    data.pages.filter((page) => {
      if (pagesToCheck.includes(page.label)) {
        baseBundleSizes.push({
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
    return baseBundleSizes;
  },

  checkHeadBundleSize: () => {
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
    const headBundleSizes = [];
    data.pages.filter((page) => {
      if (pagesToCheck.includes(page.label)) {
        headBundleSizes.push({
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
    return headBundleSizes;
  },

  compareBundles: (baseBundles, headBundles) => {
    console.log(baseBundles, headBundles);
  }
};

// get base bundle sizes, get pr bundle sizes, compare, fail if difference is +1.05%
