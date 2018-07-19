# Start kit to create a package with react js

```bash
# clone the repo and install the dependencies
git clone https://github.com/sudkumar/reactjs-package-starter-kit my-package
cd my-package
yarn install # npm install

# remove .git
rm -rf .git
# clean the readme
echo 'My Awesome Package' > README.md
```

### Directory Structure

#### You will start with the following directory structure
- src           - contains source code
- \_\_tests\_\_ - tests for our source code
- docs          - documentation (can be staticly hosted on gh-pages)
- gh-pages      - src code for the docs folder (webpack => gh-pages => docs)

### Start implementing
A sample component is created. Try changing it and run
```bash
yarn start # npm start
```
This will watch your src directory for change and will push them into a lib folder

### Write docs
```bash
yarn docs
```
This will start a local server and will watch for your changes inside src and gh-pages directory and will hot reload for each changes

### Writing tests
```bash
yarn test
yarn test:dev # to run test in watch mode
```
Jest is used as testing framework.

### Publishing package
```bash
yarn release
```

### That's it.

## Contribution

Any contribution is Welcomed

