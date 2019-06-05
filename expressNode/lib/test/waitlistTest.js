var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('/GET Test fetch for waitlist result for a given restaurant', function (){
    var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/waitlist/1")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
            });
        });

    it("Should return an array object with more than 1 object",function(){
         expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(1);		
		response.body.should.be.a('array');
		expect(response).to.have.nested.property('body[0]')
    });

    it("Each element in the array has the expected properties", function(){

        expect(response.body).to.not.be.a.string;
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('queueID');
					expect(body[i]).to.have.property('customerName');
                    expect(body[i]).to.have.property('restaurantID');
                    expect(body[i]).to.have.property('groupSize');
                    expect(body[i]).to.have.property('joinTime');
                    expect(body[i]).to.have.property('quotedtime');
                    expect(body[i]).to.have.property('email');
                    expect(body[i]).to.have.property('phone');
                    expect(body[i]).to.have.property('notified');
                    expect(body[i]).to.have.property('confirmed');
				}
				return true;
			});
    });
});

describe('/POST Test to add to waitlist of a given restaurant', function (){

    let waitlistEntry = {
        "queueID" : 4,
        "customerName": "Jon Snow",
        "restaurantID": 3,
        "groupSize": 2,
        "joinTime": new Date("February 14, 2019 17:04:00"),
        "quotedtime": new Date("February 14, 2019 17:20:00"),
        "email" : "youknownothing@gmail.com",
        "phone" : "2069678888",
        "notified": false,
        "confirmed": false
      };
		 
    it('Test to add to waitlist',function (done) {
        chai.request("http://localhost:8080")
			.post("/waitlist").send(waitlistEntry)
			.end(function (err, res) {
				expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
            });
        });
    });