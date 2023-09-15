module.exports = {
  getAddedFragments: ({ github, context, core }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    // Use the Github API to query for the list of files from the PR
    return github
      .paginate(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
        { owner, repo, pull_number: issue_number },
        (response) => {
          response.data.filter((file) => {
            file.status === 'added' &&
              file.filename.startsWith('src/fragments/');
          });
        }
      )
      .then((files) => {
        // Save these values to the Github env
        core.exportVariable('NEW_FRAGMENTS', files);

        console.log('New fragments: ', files);

        console.log(files.length);
        // Return the new files count to be used in the github workflow
        return files.length;
      });
  },

  addComment: async ({ github, context }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    const useInlineFiltersComment =
      'We are moving away from the use of Fragments. Please instead use InlineFilter. See our README for guidance.';
    github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body: useInlineFiltersComment
    });
  }
};
