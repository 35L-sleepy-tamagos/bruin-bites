import React from "react";

export default function Home() {
  /* Logos */
  /* Dining Halls */
  const deNeveLogo = "https://i.ibb.co/YBHwTKv/unnamed.png";
  const epiLogo = "https://i.ibb.co/KDDbh68/download.jpg";
  const bplateLogo = "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20143/534d978abd26f552ab000554_BruinPlate_Logo_FullColor/BruinPlate_Logo_FullColor_41db8eb4-2f25-41fa-9d71-ff19f2170580-prv.jpg"
  const feastLogo = "https://menu.dining.ucla.edu/Content/Images/Menus/FeastSpiceKitchen/feastspicekitchen-logo.png?rev=2021-10-26b";
  /* Take-Out */
  const rendeLogo = "https://menu.dining.ucla.edu/Content/Images/Menus/Rendezvous/rendezvous-logo.png"
  const studyLogo = "https://menu.dining.ucla.edu/Content/Images/Menus/HedrickStudy/hedrickstudy-logo.png"
  const bcafeLogo = "https://menu.dining.ucla.edu/Content/Images/Menus/BruinCafe/bruincafe-logo.png"
  const dreyLogo = "https://menu.dining.ucla.edu/Content/Images/Menus/Drey/drey-logo.png"

  /* Websites -- to be replaced with Review Page */
  /* Dining Halls */
  const deNeveLink = "http://menu.dining.ucla.edu/Menus/DeNeve/";
  const epiLink = "http://menu.dining.ucla.edu/Menus/Epicuria/";
  const bplateLink = "https://menu.dining.ucla.edu/Menus/BruinPlate/";
  const feastLink = "http://menu.dining.ucla.edu/Menus/FeastAtRieber";
  /* Take-Out */
  const rendeLink = "http://menu.dining.ucla.edu/Menus/Rendezvous"
  const studyLink = "http://menu.dining.ucla.edu/Menus/HedrickStudy"
  const bcafeLink = "http://menu.dining.ucla.edu/Menus/BruinCafe"
  const dreyLink = "http://menu.dining.ucla.edu/Menus/Drey";

  let logo = [
    deNeveLogo, epiLogo, bplateLogo, feastLogo, rendeLogo, studyLogo, bcafeLogo, dreyLogo,
  ];
  let website = [
    deNeveLink, epiLink, bplateLink, feastLink, rendeLink, studyLink, bcafeLink, dreyLink,
  ];

  const openUrl = (url, index) => {
    const win = window.open(url[index], "_blank");
    if (win != null) {
      win.focus();
    }
  }

  return (
    <div>
      <h1>Welcome to Bruin Bites!</h1>
      <div id="imageContainer">
        {logo.map((logo, index) => {
          return (
            <div className="imgWrapper">
              <img src={logo} key={index} alt="pausechamp" onClick={() => openUrl(website, index)}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
