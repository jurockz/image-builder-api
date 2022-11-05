module.exports = function (mongoose) {
  const Schema = mongoose.Schema;
  // Components
  const ComponentSchema = new Schema({
    title: String,
    path: String,
  });
  // hierarchy
  const HierarchySchema = new Schema({
    type: Map,
    of: new Schema({
      transform: {
        localPosition: {
          x: Number,
          y: Number,
        },
        localRotation: Number,
        localScale: {
          width: Number,
          height: Number,
        },
      },
      zIndex: Number,
      specific: {
        type: Map,
        of: Schema.Types.Mixed,
      },
    }),
  });

  // All Modals
  var models = {
    ComponentModel: mongoose.model("components", ComponentSchema),
    HierarchyModel: mongoose.model("hierarchies", HierarchySchema),
  };
  return models;
};
