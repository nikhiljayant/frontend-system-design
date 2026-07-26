const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'greeter.proto');

// Load the .proto file dynamically
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

// Create gRPC client instance
function main() {
  const target = '127.0.0.1:50051';
  const client = new greeterProto.GreeterService(
    target,
    grpc.credentials.createInsecure()
  );

  // Invoke the SayHello RPC method
  const name = process.argv[2] || 'Developer';
  client.sayHello({ name }, (error, response) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    console.log('Server Response:', response.message);
  });
}

main();
