require("./config/db.connection");
const grpc = require("@grpc/grpc-js");
const productLoder = require("@grpc/proto-loader");
const path = require("path");
const protoPath = path.join(__dirname, "..", "..", "protos", "product.proto");
const productProto = productLoder.loadSync(protoPath);
const { productPackage } = grpc.loadPackageDefinition(productProto);
const productServicURL = "localhost:4001";

const {
  listProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./function/product.grpc");

function main() {
  const server = new grpc.Server();
  server.addService(productPackage.ProductService.service, {
    listProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  });

  server.bindAsync(
    productServicURL,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) return console.log(err.message);
      console.log("grpc service is runing ... " + port);
      server.start();
    }
  );
}

main();
