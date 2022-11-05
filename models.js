module.exports = function (mongoose) {
  const Schema = mongoose.Schema;
  // Components
  const ComponentSchema = new Schema({
    title: String,
    path: String,
  });
  // hierarchy
  const SpecificSchema = new Schema({
    type: Map,
    of: Schema.Types.Mixed,
  });

  const ScaleSchema = new Schema({
    width: Number,
    height: Number,
  });

  const PositionSchema = new Schema({
    x: Number,
    y: Number,
  });

  const ObjectSchema = new Schema({
    transform: {
      localPosition: PositionSchema,
      localRotation: Number,
      localScale: ScaleSchema,
    },
    zIndex: Number,
    specific: SpecificSchema,
  });

  const HierarchySchema = new Schema({
    type: Map,
    of: ObjectSchema,
  });

  // All Modals
  var models = {
    ComponentModel: mongoose.model("components", ComponentSchema),
    HierarchyModel: mongoose.model("hierarchies", HierarchySchema),
  };
  return models;
};
