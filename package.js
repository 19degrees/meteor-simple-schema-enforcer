Package.describe({
  name: '19degrees:simple-schema-enforcer',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'Wrapper around aldeed:simple-schema. Enforces schema & allows error handlers to be attached.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/19degrees/meteor-simple-schema-enforcer',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('simple-schema-enforcer.js');
  api.export(['SimpleSchemaEnforcer'], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('19degrees:simple-schema-enforcer');
  api.addFiles('simple-schema-enforcer-tests.js');
});
