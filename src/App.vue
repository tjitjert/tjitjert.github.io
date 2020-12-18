<template>
  <div id="app">
    <div class="d-flex flex-column justify-content-center">
      <div id="title">
        <div class="flex-wrap text-center">
          <h3 class="p-2">EPISCHE ECO EVA</h3>
        </div>
      </div>
      <div id="header-buttons" class="mb-3">
        <div class="d-flex flex-row justify-content-center flex-wrap">
          <b-button id="gedicht" class="mr-2" variant="success" @click="handleClick">
            Gedicht
          </b-button>
          <b-button id="instructie" class="mr-2" variant="success" @click="handleClick">
            Instructie
          </b-button>
          <b-button id="cadeau" variant="success" @click="handleClick">
            Cadeau
          </b-button>
        </div>
      </div>
      <div v-if="section === 'gedicht'" id="gedicht" class="p-3">
        <h3 class="text-secondary">Gedicht</h3>
        <p>
          Joho Eva,
        </p>
        <p>
          Zit je klaar?<br />
          Want de tijd is weer daar.<br />
          Voor dit poëtische gebaar.<br />
        </p>
        <p>
          Het is vjezze klaas.<br />
          En zijn pieter baas.<br />
          Rappend in een raas.<br />
        </p>
        <p>
          us bereid je voor.<br />
          Op dit rap symfonie koor.<br />
          Direct in je oor.<br />
        </p>
        <p>
          Wat een jaar.<br />
          Een beetje raar.<br />
          Maar gelukkig niet allemaal naar.<br />
        </p>
        <p>
          Samenwonen in grunn.<br />
          Samen met P fabergé, wat een fun.<br />
          Of reikte je al snel voor je gun?<br />
        </p>
        <p>
          Was het even wennen?<br />
          Je leert wel alles van elkaar kennen.<br />
          Bevalt het toch niet, kan je altijd nog wegrennen.<br />
        </p>
        <p>
          Helemaal met zo'n speciaal geval.<br />
          Die fabergé is soms een beetje mal.<br />
          Maar stukken beter dan zo'n glibberige vindicat bal.<br />
        </p>
        <p>
          Volgens mij is het een pot blijheid.<br />
          Elkaar te hebben in dichtere nabijheid.<br />
          Bestrijkt met een goede laag vrijheid.<br />
        </p>
        <p>
          Samen bouwend aan jullie eigen tuin.<br />
          Tussen het KPN parkeerplaats puin.<br />
          Zelfgeknutselde bakken vol met aardebruin.<br />
        </p>
        <p>
          Hopend op groeiend groen.<br />
          Mooie planten en een kruiden legioen.<br />
          Dat stukje natuur, is waar jullie het voor doen.<br />
        </p>
        <p>
          We zijn ontzettend benieuwd naar je grote project.<br />
          Een Eva original, de ekte ekt.<br />
          Ben je al bijna klaar met de laatste act?<br />
        </p>
        <p>
          Met 2 fantastische oude vrouwen op pad.<br />
          Waarvan 1 soms iets vergat.<br />
          Volgens mij raakte je dat avontuur niet zat.<br />
        </p>
        <p>
          In vrijwel je eentje zet je zo'n mega project op pote.<br />
          En we hebben nu al genote.<br />
          Van menig anekdote.<br />
        </p>
        <p>
          We hebben enkel lof.<br />
          Voor jou als film prof.<br />
          De films die je maakt zijn altijd tof.<br />
        </p>
        <p>
          Over naar jullie portugese avontuur.<br />
          Bijna geblockt door die corona muur.<br />
          De cursus (s)permacultuur.<br />
        </p>
        <p>
          Het klinkt heel koel.<br />
          Een groene, ecologische en ethieke boel.<br />
          Met een mooi geformuleerd doel.<br />
        </p>
        <p>
          Terug naar de natuur.<br />
          Naar een ontwerpmethode, naakt en puur.<br />
          Verantwoordelijk voor je eigen vuur.<br />
        </p>
        <p>
          Was het weer terug naar het begin?<br />
          In levensstijlachtige zin?<br />
          Op zoek naar de innerlijke groene godin.<br />
        </p>
        <p>
          In plaats van een bad chillen in een gietijzeren teil.<br />
          Met zeep niet gemaakt van bevergeil.<br />
          Daardoor fabergé's gezicht vol met kwijl.<br />
        </p>
        <p>
          De surprise is dit jaar een beetje hybride.<br />
          En kan misschien lijken als een beetje timide.<br />
          Het is zeker geen egyptische pyramide.<br />
        </p>
        <p>
          Dit gedicht is stap één.<br />
          Maar dat is voor surprise vrij algemeen.<br />
          Gelukkig zijn we er bijna doorheen.<br />
        </p>
        <p>
          Stap twee is een instructie.<br />
          Voor een mini permacultuur productie.<br />
          Al gaat het enkel om een introductie.<br />
        </p>
        <p>
          In je pakketje vind je een aantal dingen.<br />
          Waarmee je een ecosysteem in elkaar kan wringen.<br />
          Met een beetje liefde gaat je creatie al snel zingen.<br />
        </p>
        <p>
          Er mist nog wel wat.<br />
          Iets vochtigs en nat.<br />
          En dan heb ik het niet over een bevergeil gevuld bad.<br />
        </p>
        <p>
          Het gaat om een stuk mos.<br />
          Dus je moet nog even naar het bos.<br />
          Daar ligt vast nog wel een stukje los.<br />
        </p>
        <p>
          Want deel van een prachtige permacultuur.<br />
          Hoort natuurlijk een goede hoeveelheid avontuur.<br />
          En mos blijft wekenlang in een doos niet zo puur.<br />
        </p>
        <p>
          Want deel van een prachtige permacultuur.<br />
          Hoort natuurlijk een goede hoeveelheid avontuur.<br />
          En mos blijft wekenlang in een doos niet zo puur.<br />
        </p>
        <p>
          Pak je pakketje maar uit en klik dan hier op 'instructie'.<br />
          Geef vervolgens ons een introductie.<br />
          Over ecosysteem productie.<br />
        </p>
        <p>
          Bewaar het bouwen zelf maar voor later.<br />
          Voor een dag zonder kater.<br />
          Dan ben je wat accurater.<br />
        </p>
        <p>
          Na de instructie is het tijd voor de knop 'cadeau'.<br />
          En geloof me, daar ben je zo.<br />
          Want je zit al lekker in de lezende flow.<br />
        </p>
        <p>
          We zijn het gedicht nu wel zat.<br />
          Hopelijk vond je het wat.<br />
          Want elk jaar ligt hij weer wat hoger, die lat.<br />
        </p>
        <p>
          Dit is het einde van deze poetische zee.<br />
          Tijd voor stap twee.<br />
          We luisteren met smart met je mee.<br />
        </p>
        <p>
          Liefs,
        </p>
        <p>
          Vjezze klaas en pieter baas
        </p>
      </div>
      <div v-if="section === 'instructie'" id="instructie"
      class="d-flex flex-column justify-content-center p-3">
        <h3 class="text-secondary mb-3">Instructie</h3>
        <h5>Benodigdheden</h5>
        <span>Glazen pot</span>
        <span>Mini plantjes</span>
        <span>Potgrond</span>
        <span>Hydrokorrels</span>
        <span>Mos</span>

        <h5 class="mt-3">Stap 1</h5>
        <p>
          Voordat je het planten terrarium gaat maken
           is het handig om je fles of pot van te voren goed schoon te maken.
          Daarna kun je op de bodem een laag grind doen
           van zo’n 2 tot 3 cm. Dit hoeft niet heel precies, als er maar een goede laag in zit.
          Dit is tegen overtollig water in je terrarium.
        </p>
        <h5 class="mt-3">Stap 2</h5>
        <p>
          Nu kun je de aarde bovenop het grind doen.
          Dit mag wat meer zijn dan de laag grind, ongeveer 4 tot 5 cm.
          Het belangrijkste is dat de plantjes met hun hele kluit in de aarde staan.
          Zo kunnen ze voldoende drinken.
        </p>
        <h5 class="mt-3">Stap 3</h5>
        <p>
          Haal de plastic potjes van de mini plantjes af.
          Als er veel losse aarde omheen zit mag je dit ook voorzichtig weghalen.
          Zorg ervoor dat je de wortels zo min mogelijk beschadigd.
        </p>
        <h5 class="mt-3">Stap 4</h5>
        <p>
          Zet de plantjes nu één voor één in de aarde.
          Je kunt het beste beginnen met het kleinste of
           meest kwetsbare plantje en als laatste het grootste plantje.
          Zo beschadig je ze het minst.
        </p>
        <h5 class="mt-3">Stap 5</h5>
        <p>
          Je terrarium is nu zo goed als af.
          Je kunt hem naar eigen smaak nog wat aankleden met extra grind,
           mos of houtsnippers op de bodem.
           Dit zijn allemaal natuurlijke materialen maar
           je kunt natuurlijk ook voor bijvoorbeeld gekleurd grind kiezen.
           Zo geef je het planten terrarium een extra vrolijk tintje.
        </p>
        <h5 class="mt-3">Stap 6</h5>
        <p>
          Nu je eigen planten terrarium af is kun je hem op een mooie plek in de kamer zetten.
          Hij houdt niet van teveel licht en warmte, maar ook niet van een te donkere plek.
          Sluit hem niet direct af.
          Laat je zelfgemaakte terrarium minstens één week ‘luchten’ en sluit hem daarna af.
          Als je ziet dat hij na een dag al helemaal aan het condenseren is kun je de dop
           er het beste weer afhalen en hem nog wat langer open laten.
          Na een paar dagen kun je hem natuurlijk alsnog dichtdoen.
        </p>
        <h5 class="mt-3">Bron</h5>
        <a href="https://inspiratie.intratuin.nl/diy-planten-terrarium/">DIY: PLANTEN TERRARIUM</a>
      </div>
      <div v-if="section === 'cadeau'" id="cadeau" class="p-3 text-center">
        <h3 class="text-secondary">Cadeaubon</h3>
        <h3>€25,-</h3>
        <h3><a class="text-success" href="https://www.plantje.nl/">PLANTJE.NL</a></h3>

      </div>
      <div id="footer-buttons" class="my-2">
        <div class="d-flex flex-row justify-content-center flex-wrap">
          <b-button id="gedicht" class="mr-2" variant="success" @click="handleClick">
            Gedicht
          </b-button>
          <b-button id="instructie" class="mr-2" variant="success" @click="handleClick">
            Instructie
          </b-button>
          <b-button id="cadeau" variant="success" @click="handleClick">
            Cadeau
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
  data() {
    return {
      section: 'gedicht',
    };
  },
  methods: {
    handleClick(event) {
      this.section = event.target.id;
    },
  },
};
</script>

<style>
</style>
