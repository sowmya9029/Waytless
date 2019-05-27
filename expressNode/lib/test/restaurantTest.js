var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

 /*
  * Test to get restaurant list object
  */
describe('/GET Test fetch for restaurant list result', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/restaurantlist")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
	//check if its an json list object
    it('Should return an array object with more than 1 object', function () {
		expect(response).to.have.status(200);

		expect(response.body).to.have.length.above(1);		
		response.body.should.be.a('array');
		expect(response).to.have.nested.property('body[0]')
		
    });

	it('Each element in the array has the expected properties', function(){
		expect(response.body).to.not.be.a.string;
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('restaurantID');
					expect(body[i]).to.have.property('name');
                    expect(body[i]).to.have.property('cuisine');
                    expect(body[i]).to.have.property('phoneNumber');
                    expect(body[i]).to.have.property('email');
                    expect(body[i]).to.have.property('rating');
					expect(body[i].address).to.have.property('street');
					expect(body[i].address).to.have.property('number');
					expect(body[i].address).to.have.property('zip');
					expect(body[i].address).to.have.property('city');
				}
				return true;
			});
	});	
});


 /*
  * Test to get restaurant list object
  */
 describe('/restaurantlist/:city test', () => {
	it('it should GET a restaurant list object by the given city', (done) => {
		let city ='Bellevue';
		  chai.request("http://localhost:8080")
		  .get('/restaurantlist/' + city)
		  .end((err, res) => {
			    expect(err).to.be.null;
				res.should.have.status(200);
				res.body.should.be.a('array');
					for (var i = 0; i < res.body.length; i++) {
						expect(res.body[i]).to.have.property('restaurantID');
						expect(res.body[i]).to.have.property('name');
						expect(res.body[i]).to.have.property('cuisine');
						expect(res.body[i]).to.have.property('phoneNumber');
						expect(res.body[i]).to.have.property('email');
						expect(res.body[i]).to.have.property('rating');
						expect(res.body[i].address).to.have.property('street');
						expect(res.body[i].address).to.have.property('number');
						expect(res.body[i].address).to.have.property('zip');
						expect(res.body[i].address).to.have.property('city').eql(city);
					}
				
			done();
		  });
		

	});
});

/*
  * Test to get restaurant object
  */
 describe('/restaurantlist/id:id test', () => {
	it('it should GET a restaurant object by the given id', (done) => {
		let id =1;
		  chai.request("http://localhost:8080")
		  .get('/restaurantlist/id/' + id)
		  .end((err, res) => {
			    expect(err).to.be.null;
				res.should.have.status(200);
				res.body.should.be.a('object');					
						expect(res.body).to.have.property('restaurantID').eql(id);
						expect(res.body).to.have.property('name');
						expect(res.body).to.have.property('cuisine');
						expect(res.body).to.have.property('phoneNumber');
						expect(res.body).to.have.property('email');
						expect(res.body).to.have.property('rating');
						expect(res.body.address).to.have.property('street');
						expect(res.body.address).to.have.property('number');
						expect(res.body.address).to.have.property('zip');
						expect(res.body.address).to.have.property('city');
					
				
			done();
		  });
		

	});
});
