const supertest = require('supertest');
const should = require('should');
const server = supertest.agent('http://localhost:3000');

describe('Api Marvel /characters', function() {
  it('should return 10 first characters by default', function(done) {
    server
      .get('/v1/marvel/characters')
      .expect('Content-type', /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.meta.count.should.equal(10);
        res.body.meta.offset.should.equal(0);
        res.body.meta.limit.should.equal(10);
        res.body.data.length.should.equal(10);
        done();
      });
  });

  it('should return 21 first characters precisely', function(done) {
    server
      .get('/v1/marvel/characters?limit=21')
      .expect('Content-type', /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.meta.count.should.equal(21);
        res.body.meta.offset.should.equal(0);
        res.body.meta.limit.should.equal(21);
        res.body.data.length.should.equal(21);
        done();
      });
  });

  it('should return 2 characters starting at index 2', function(done) {
    server
      .get('/v1/marvel/characters?limit=2&offset=2')
      .expect('Content-type', /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.meta.count.should.equal(2);
        res.body.meta.limit.should.equal(2);
        res.body.meta.offset.should.equal(2);
        res.body.data.length.should.equal(2);
        done();
      });
  });
});

describe('Api Marvel /characters/:id', function() {
  it('should return the requested character', function(done) {
    server
      .get('/v1/marvel/characters/')
      .expect('Content-type', /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.meta.count.should.equal(10);
        res.body.meta.offset.should.equal(0);
        res.body.meta.limit.should.equal(10);
        res.body.data.length.should.equal(10);
        done();
      });
  });
});
