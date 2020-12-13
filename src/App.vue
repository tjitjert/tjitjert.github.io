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
          Planten zijn je lust en je leven <br/>
          De Sint heeft ze je vaak gegeven <br/>
          Je huis moet wel een rimboe zijn <br/>
          Maar dat vind jij juist fijn
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
