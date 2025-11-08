# Commit Message Instructions (Conventional Commits Standard)

Follow the Conventional Commits specification to make commit messages consistent, readable, and useful for generating changelogs.

## Structure
- **Subject Line**: Start with a type prefix, optional scope in parentheses, colon, space, then a concise imperative description (e.g., "add login endpoint"). Max 50 characters. No period at the end.
- **Blank Line**: Always add one after the subject.
- **Body**: Explain *what* changed and *why* (not *how*). Wrap lines at 72 characters. Use bullet points if needed.
- **Footer**: Optional. Include issue references (e.g., "Closes #123"), breaking changes (e.g., "BREAKING CHANGE: remove deprecated API"), or co-authors.

## Allowed Prefixes
Use one of these types to categorize the change:
- **feat**: A new feature for the user (not a new feature for build script).
- **fix**: A bug fix for the user (not a fix to a build script).
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing tests or correcting existing tests.
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation.
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- **revert**: Reverts a previous commit.

If a change doesn't fit these, use "chore:" as a fallback. Custom prefixes can be added if team-approved, but stick to standards for compatibility with tools like semantic-release.

## Best Practices
- Use imperative mood in the subject (e.g., "add" not "added" or "adds").
- Be specific: Avoid vague messages like "update code".
- Reference issues/pull requests in the footer.
- For breaking changes, start the footer with "BREAKING CHANGE:" and explain the impact.
- Keep it concise but informative—aim for messages that help future readers.