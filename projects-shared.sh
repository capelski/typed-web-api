allFiles=(
  "package-lock.json"
  "projects/@typed-web-api/client/package.json"
  "projects/@typed-web-api/express-server/package.json"
  "projects/@typed-web-api/nestjs-server/package.json"
  "projects/@sample-express-app/client/package.json"
  "projects/@sample-express-app/common/package.json"
  "projects/@sample-express-app/server/package.json"
  "projects/@sample-nest-app/client/package.json"
  "projects/@sample-nest-app/common/package.json"
  "projects/@sample-nest-app/server/package.json"
);

checkDiff() {
  for file in ${allFiles[@]}; do
    DIFF=$(git diff $file)

    if [[ $DIFF != "" ]]; then
      echo "Cannot link/unlink with changes in \"$file\""
      exit 1;
    fi
  done
}

discardDiff() {
  for file in ${allFiles[@]}; do
    git checkout $file;
  done
}

installDependency() {
  dependencyMode=$1;
  echo "Installing $2 ($dependencyMode dependency) in $3..."
  [[ $dependencyMode == 'local' ]] && dependencyTarget="./projects/$2" || dependencyTarget=$2

  npm i -S $dependencyTarget -w $3
}

installDependencies() {
  checkDiff

  installDependency $1 @typed-web-api/common @typed-web-api/client
  installDependency $1 @typed-web-api/common @typed-web-api/express-server
  installDependency $1 @typed-web-api/common @typed-web-api/nestjs-server

  installDependency $1 @typed-web-api/common @sample-express-app/common
  installDependency $1 @typed-web-api/client @sample-express-app/client
  installDependency $1 @typed-web-api/express-server @sample-express-app/server

  installDependency $1 @typed-web-api/common @sample-nest-app/common
  installDependency $1 @typed-web-api/client @sample-nest-app/client
  installDependency $1 @typed-web-api/nestjs-server @sample-nest-app/server

  echo "Reinstalling dependencies at root folder..."
  npm i

  echo "Discarding generated workspace changes..."
  discardDiff
}