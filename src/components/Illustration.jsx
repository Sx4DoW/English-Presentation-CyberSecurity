import ai from "../assets/visuals/ai-security.svg";
import antivirus from "../assets/visuals/antivirus.svg";
import attackerTypes from "../assets/visuals/attacker-types.svg";
import bestPractices from "../assets/visuals/best-practices.svg";
import crypto from "../assets/visuals/cryptography.svg";
import crimeware from "../assets/visuals/crimeware.svg";
import defences from "../assets/visuals/defences.svg";
import citizenship from "../assets/visuals/digital-citizenship.svg";
import hackers from "../assets/visuals/hacker-hats.svg";
import ict from "../assets/visuals/ict-impact.svg";
import ictFrontiers from "../assets/visuals/ict-frontiers.svg";
import malwareFamilies from "../assets/visuals/malware-families.svg";
import malware from "../assets/visuals/malware.svg";
import metaverse from "../assets/visuals/metaverse-risks.svg";
import networkThreats from "../assets/visuals/network-threats.svg";
import people from "../assets/visuals/people.svg";
import shield from "../assets/visuals/digital-trust.svg";
import smartSystems from "../assets/visuals/smart-systems.svg";
import summary from "../assets/visuals/stay-secure.svg";
import threats from "../assets/visuals/threats.svg";

const visuals = {
  ai,
  attackers: attackerTypes,
  checklist: bestPractices,
  city: smartSystems,
  crypto,
  crimeware,
  citizenship,
  defences,
  hats: hackers,
  holo: metaverse,
  ict,
  frontiers: ictFrontiers,
  malware,
  network: networkThreats,
  nodes: malwareFamilies,
  people,
  scanner: antivirus,
  shield,
  summary,
  threats,
};

export function Illustration({ type }) {
  return (
    <figure className="visual" aria-hidden="true">
      <img className="visual-image" src={visuals[type] ?? visuals.summary} alt="" draggable="false" />
    </figure>
  );
}
