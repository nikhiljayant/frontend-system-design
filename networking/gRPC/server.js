const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'greeter.proto');

// Load the .proto file dynamically
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, // Preserve field names from .proto file instead of converting them to camelCase
  longs: String,  // Represent 64-bit integers as Strings to prevent JS precision loss
  enums: String,  // Represent enum values by their string names instead of integer numbers
  defaults: true, // Output default values for missing fields based on protobuf specs
  oneofs: true,   // Create virtual properties on output objects indicating active oneof fields
});

const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

// Implement the SayHello RPC handler
function sayHello(call, callback) {
  const name = call.request.name || 'World';
  // Respond back via callback(error, response)
  callback(null, { message: `Hello, ${name}!` });
}

// Start the gRPC server
function main() {
  const server = new grpc.Server();
  server.addService(greeterProto.GreeterService.service, { sayHello });

  const PORT = '127.0.0.1:50051';
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
    console.log(`gRPC Server running at http://${PORT}`);
  });
}

main();
