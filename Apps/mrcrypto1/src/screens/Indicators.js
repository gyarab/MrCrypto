import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
//fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
class Indicators extends Component {
  render() {
    const writing = {
      color: "#5d5d5d",
      fontSize: "18px"
    };
    const headline = {
      color: "#444444",
      fontSize: "26px"
    };
    return (
      <Container>
        <Row>
          <h2 style={headline}>
            <FontAwesomeIcon icon={faChartLine} /> Indikátory Technických
            analýz:
          </h2>
        </Row>
        <Row>
          <h2 style={headline}>MA - moving avarage</h2>
          <p style={writing}>
Klouzavý průměr je jednoduchý způsob pro výpočet budoucího vývoje na základě minulých dat.
Používá se více typů klouzavých průměru: jednoduchý klouzavý průměr, exponenciální klouzavý průměr,
 triangulární klouzavý průměr, vážený klouzavý průměr.
 -----
          </p>
        </Row>
        <Row>
          <h2 style={headline}>SMA - simple moving avarage</h2>
          <p style={writing}>
          Jednoduchý klouzavý průměr je specifický tím, že přikládá všem hodnotám stejnou důležitost, což se dá vnímat jako nevýhoda.
           Pokud je poslední hodnota extrémní, může se po přídání další hodnoty průměr rapidně změnit opačným směrem, což nemusí
           znamenat, že nastal prudký vzrůst či spád v ceně.
          Počítá me jej tedy (cena n + cena n-1 + cena n-2)/n
          -----
          Simple moving avarage is specific by giving every counted value same weight, which can cause in inaccurate prediction,
          if there is big differnce in the final values
          </p>
        </Row>
        <Row>
          <h2 style={headline}>EMA - exponential moving avarage</h2>
          <p style={writing}>
          Exponenciální klouzavý průměr dává vyšší váhu posledním hodnotám.
          Počítáme jej tedy: (EMA n-1) + [x*(cena n-EMA n-1)], kdy x=2/(n+1)
          -------
          </p>
        </Row>
        <Row>
          <h2 style={headline}>TMA - triangular moving avarage</h2>
          <p style={writing}>
          Triangulární klouzavý průměr dává nejvyšší váhu prostřední/prostředním hodnotě/hodnotám a směrem ke krajům váha klesá.
          Počítáme jej tedy: (2*cena n-3 + cena n-2 + cena n-1 + 2*cena n)/n
          ---------
          </p>
        </Row>
        <Row>
          <h2 style={headline}>WMA - weighted moving avarage</h2>
          <p style={writing}>
U váženého klouzavého průměru přiřazujeme každé hodnotě jinou váhu sestupně od hodnoty bližší momentalní hodnotě.
  ------------
          </p>
        </Row>
        <Row>
          <h2 style={headline}>BOB - bollingers band</h2>
          <p style={writing}>
Bollingerova pásma používají klouzavé průměry tak, že vykreslují čáry v určité vzdálenost nad a pod klouzavý průměr. Bollingerova pásma tvoří tři křivky. Středová zelená křivka zobrazuje klouzavý průměr, Kolem středu je vytvořena obálka proměnlivé šířky (modrá). Obálku tvoří násobek r  směrodatných odchylek n posledních zavíracích kurzů.
---------------
          </p>
        </Row>
      </Container>
    );
  }
}

export default connect()(Indicators);
