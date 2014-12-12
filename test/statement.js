var fs         = require('fs')
  , mocha      = require('mocha')
  , chai       = require('chai')  
  , statements = require('../lib/statements')
  , expect     = chai.expect;

describe('statements', function() {

  it('should read a single statement file', function() {
    var result = statements.read('test/fixtures/single.sql');
    expect(result.statement).to.equal('select * from table1;');
  });

  it('should read a multi-line statement file', function() {
    var result = statements.read('test/fixtures/multi-line-statement.sql');
    expect(result.statement).to.equal('select *\nfrom table1\nwhere user = 1;');
  });

  it('should read multiple statement file', function() {
    var result = statements.read('test/fixtures/multiple-statements.sql');
    expect(result.statement1).to.equal('select * from table1;');
    expect(result.statement2).to.equal('select * from table2;');
  });

  it('should handle spaces before the first line', function() {
    var result = statements.read('test/fixtures/prespace.sql');
    expect(result.statement).to.equal('select * from table1;');
  });

  it('should handle spaces after the last line', function() {
    var result = statements.read('test/fixtures/postspace.sql');
    expect(result.statement).to.equal('select * from table1;');
  });

  it('should work with invalid javascript names for the statement name', function() {
    var result = statements.read('test/fixtures/sentence-name.sql');
    expect(result['invalid javascript name']).to.equal('select * from table1;');
  });

  it('should read async with callback', function(done) {
    statements.read('test/fixtures/single.sql', function(err, result) {
      expect(result.statement).to.equal('select * from table1;');
      done();
    });
  });

  it('should read aysnc with promise', function(done) {
    statements.readAsync('test/fixtures/single.sql')
    .then(function(result) {
      expect(result.statement).to.equal('select * from table1;');
      done();
    });
  });

});