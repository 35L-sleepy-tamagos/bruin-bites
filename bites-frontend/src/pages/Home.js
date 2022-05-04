import React from "react";

export default function Home() {
  let logo = [
    "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20143/534d978abd26f552ab000554_BruinPlate_Logo_FullColor/BruinPlate_Logo_FullColor_41db8eb4-2f25-41fa-9d71-ff19f2170580-prv.jpg",
    "https://image.isu.pub/120515200618-0c848792560648f8a32f12c0c75a602e/jpg/page_1.jpg",
    "https://portal.housing.ucla.edu/sites/g/files/yaccgq1686/files/media/images/Logo_Epicuria%20at%20Covel_300x300.png",
    "https://menu.dining.ucla.edu/Content/Images/Menus/HedrickStudy/hedrickstudy-logo.png",
    "https://menu.dining.ucla.edu/Content/Images/Menus/BruinBowl/bruinbowl-logo.png",
    "https://menu.dining.ucla.edu/Content/Images/Menus/Drey/drey-logo.png",
  ];
  return (
    <div>
      <h1>Welcome to Bruin Bites!</h1>
      {logo.map((logo, index) => (
        <img src={logo} key={index} />
      ))}
    </div>
  );
}
