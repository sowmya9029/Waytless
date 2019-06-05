var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
const url = "https://waytlessserver.azurewebsites.net/";
var http = require('http');
chai.use(chaiHttp);

describe('Test fetch menu items result', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request(url)
			.get("/menuitems/1")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return an array object with more than 1 object', function () {
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(2);
		expect(response).to.have.headers;
    });

	it('Each element in the array has the expected properties', function(){
		expect(response.body).to.not.be.a.string;
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('itemID');
					expect(body[i]).to.have.property('itemName');
                    expect(body[i]).to.have.property('price');
                    expect(body[i]).to.have.property('description');
                    expect(body[i]).to.have.property('restaurantID');
                    expect(body[i]).to.have.property('itemCategory');
					expect(body[i].itemCategory).to.have.property('categoryId');
					expect(body[i].itemCategory).to.have.property('categoryName');
					expect(body[i].itemCategory).to.have.property('description');
				}
				return true;
			});
	});	
});