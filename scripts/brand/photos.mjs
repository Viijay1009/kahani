import sharp from 'sharp';
const src='design/source/opening-day.jpg';
await sharp(src).resize({width:1080}).webp({quality:82}).toFile('public/img/opening-day.webp');
await sharp(src).extract({left:150,top:0,width:930,height:480}).webp({quality:84}).toFile('public/img/reception-wall.webp');
await sharp(src).extract({left:560,top:640,width:520,height:640}).webp({quality:84}).toFile('public/img/opening-flowers.webp');
await sharp('public/brand/kahani-mark.svg').resize({width:512,height:512,fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile('public/img/kahani-parrot.png');
// OG image
const logo=await sharp('public/brand/kahani-logo.svg').resize({width:760}).png().toBuffer();
await sharp({create:{width:1200,height:630,channels:3,background:'#FBF6EA'}}).composite([{input:logo,top:180,left:220}]).jpeg({quality:88}).toFile('public/img/og-kahani.jpg');
// favicons
await sharp('public/brand/kahani-mark.svg').resize({width:180,height:180,fit:'contain',background:'#FBF6EA'}).png().toFile('src/app/apple-icon.png');
await sharp('public/brand/kahani-mark.svg').resize({width:512,height:512,fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile('src/app/icon.png');
console.log('done');
