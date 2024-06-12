allFiles=(
  "package-lock.json"
  "projects/@typed-web-api/client/package.json"
  "projects/@typed-web-api/express/package.json"
  "projects/@typed-web-api/nestjs/package.json"
  "projects/sample-client/package.json"
  "projects/sample-common/package.json"
  "projects/sample-server-express/package.json"
  "projects/sample-server-nestjs/package.json"
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
  dependencyMode=$1; # "public" or "local"
  dependencyName=$2;
  project=$3;

  dependency=''
  if [[ $dependencyMode == 'local' ]]; then
    dependency=./projects/$dependencyName
  else
    dependency=$dependencyName@latest
  fi

  echo "Installing $dependency in $project..."
  npm i -S $dependency -w $project
}

installDependencies() {
  dependencyMode=$1; # "public" or "local"

  checkDiff

  npm run clean-modules;

  installDependency $dependencyMode @typed-web-api/common @typed-web-api/client
  installDependency $dependencyMode @typed-web-api/common @typed-web-api/express
  installDependency $dependencyMode @typed-web-api/common @typed-web-api/nestjs

  installDependency $dependencyMode @typed-web-api/common sample-common
  installDependency $dependencyMode @typed-web-api/client sample-client
  installDependency $dependencyMode @typed-web-api/express sample-server-express
  installDependency $dependencyMode @typed-web-api/nestjs sample-server-nestjs

  echo "Discarding generated workspace changes..."
  discardDiff
}