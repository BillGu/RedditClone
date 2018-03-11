var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

//Testing for Main App

describe('Positive Testing', function() {
	
  //Can I create some topics and view them?  

  describe('List Topics (Currently no topic yet)', function() {
    it('responds with status 200 and length is zero', function(done) {
      chai.request(app)
        .get('/topic/1')
        .end(function(err, res) {
          var data = JSON.parse(res.text);

          expect(res).to.have.status(200);
          expect(data).to.have.lengthOf(0);
          done();
        });
    });
  });

  describe('Create topic Testing is Awesome', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .post('/topic')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({topic: 'Testing is Awesome'})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Create topic Why do people test?', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .post('/topic')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({topic: 'Why do people test?'})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Create topic Work Hard Play Hard', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .post('/topic')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({topic: 'Work Hard Play Hard'})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Upvote topic Testing is Awesome', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/topic/vote/0/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Downvote topic Why do people test?', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/topic/vote/1/0')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });


  describe('List Topics and make sure they are ordered by votes', function() {
    it('returns 3 topics that are ordered', function(done) {
      chai.request(app)
        .get('/topic/1')
        .end(function(err, res) {
          var data = JSON.parse(res.text);

          expect(res).to.have.status(200);
          expect(data).to.eql([ { Id: 0, Topic: 'Testing is Awesome', Votes: 1 },
  								{ Id: 2, Topic: 'Work Hard Play Hard', Votes: 0 },
								{ Id: 1, Topic: 'Why do people test?', Votes: -1 } ]);
          done();
        });
    });
  });
});


describe('Negative Testing', function() {
	
  //Can I do something that is wrong? 

  describe('Create a topic that exceeds 255 characters', function() {
    it('responds with error', function(done) {
      chai.request(app)
        .post('/topic')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({topic: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis dignissim augue, vel efficitur dolor. Vivamus tempus placerat ornare. Mauris feugiat mattis nibh, eu eleifend lacus commodo et. Integer ut convallis metus, quis interdum lacus. Praesent sodales, libero eleifend bibendum.'})
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.text).eql("Topic length is too long (exceeds 255 characters)")
          done();
        });
    });
  });

  describe('Create topic Are duplicates cool?', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .post('/topic')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({topic: 'Are duplicates cool?'})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  
  describe('Create the same topic again', function() {
    it('responds with error', function(done) {
      chai.request(app)
        .post('/topic')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({topic: 'Are duplicates cool?'})
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.text).eql("Topic already created!")
          done();
        });
    });
  });

});