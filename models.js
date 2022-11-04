module.exports = function (mongoose) {
  // Components
  const ComponentSchema = new mongoose.Schema({
    title: String,
    path: String,
  });

  // All Modals
  var models = {
    ComponentModel: mongoose.model("components", ComponentSchema),
  };
  return models;
};
