## To run server

cd WaytLess\expressNode
npm run dev

## To run mongo DB

cd WaytLess\expressNode
mongod -port 27017 -dbpath ".\db"

## To load sample data
cd WaytLess\expressNode\createDB
mongo
load('createSampleData.js')