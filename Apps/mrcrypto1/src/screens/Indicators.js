import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RadarMaker from "../components/RadarMaker";
import IndicatorsAccordion from "../components/IndicatorsAccordion";

export default class Indicators extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  render() {
    const info = {
      color: "#5d5d5d",
      fontSize: "18px"
    };
    const headline = {
      color: "#444444",
      fontSize: "26px"
    };
    const margin = {
      marginBottom: "100px"
    };
    return (
      <Container style={margin}>
        <Row className="justify-content-md-center centered">
          <Col>
            <h2 style={headline}>Success Rate</h2>
            <p style={info}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc
              tincidunt ante vitae massa. Maecenas libero. Aliquam ornare wisi
              eu metus. Morbi leo mi, nonummy eget tristique non, rhoncus non
              leo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante
              cursus purus, vel sagittis velit mauris vel metus. Nullam sapien
              sem, ornare ac, nonummy non, lobortis a enim. Phasellus faucibus
              molestie nisl. Itaque earum rerum hic tenetur a sapiente delectus,
              ut aut reiciendis voluptatibus maiores alias consequatur aut
              perferendis doloribus asperiores repellat. Mauris dictum facilisis
              augue.
            </p>
          </Col>
          <Col>
            <RadarMaker />
          </Col>
        </Row>
        <Row>
<<<<<<< HEAD
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
=======
          <IndicatorsAccordion />
>>>>>>> a5afce67425fab3313a277e6c1087f44e4e4a8dd
        </Row>
      </Container>
    );
  }
}
