
var startDate = ee.Date('2016-01-01');
var endDate   = ee.Date('2016-12-31');
var Bounds = ee.FeatureCollection('ft:...');
var poly=ee.FeatureCollection('ft:...');


var L8 = ee.ImageCollection('LANDSAT/LC8_L1T');
var composite = ee.Algorithms.Landsat.simpleComposite({
  collection: L8.filterDate(startDate, endDate).filterBounds(Bounds),
  asFloat: true});

var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];
var image = composite.select(bands).clip(Bounds);


var train = image.sampleRegions({
  collection: poly,
  properties: ['CLASS'],
  scale: 30  
});

// Train the classifier.