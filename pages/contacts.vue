<template>
  <div class="page contacts">
    <page-head
      :image="story.content.image"
      :boxes="story.content.boxes">
      <div
        slot="content"
        class="contacts__content">
        <heading
          size="m"
          :rich-text="story.content.title"
          class="contacts__title" />
        <rich-text
          :content="story.content.abstract"
          class="contacts__abstract" />
        <form-wrapper
          id="contacts"
          class="contacts__form">
          <validated-field
            id="contacts-email"
            v-model="form.email"
            name="email"
            type="email"
            required
            label="email"
            :rules="{ email: true }"
            component-name="InputField" />
          <validated-field
            id="contacts-name"
            v-model="form.name"
            name="nome"
            required
            type="text"
            label="Nome e cognome"
            component-name="InputField" />
          <validated-field
            id="contacts-message"
            v-model="form.message"
            required
            name="message"
            label="Messaggio"
            component-name="TextareaField" />
          <validated-field
            id="contacts-privacy"
            v-model="form.privacy"
            required
            name="privacy"
            component-name="Checkbox"
            class="contacts__privacy">
            Tanto non la leggi, perchè rompi?
          </validated-field>
          <btn
            class="contacts__btn"
            to="/"
            full>
            Taste this!
          </btn>
        </form-wrapper>
      </div>
      <template v-slot:boxes>
        <side-box light>
          <address class="contacts__address">
            Mail:
            <a
              :href="`mailto:${settings.address.email}`"
              target="_blank">
              {{ settings.address.email }}
            </a>
            <div>
              <div>
                Indirizzo:
                <a
                  href="https://www.google.it/maps/@45.4435806,11.7098501,15z"
                  target="_blank">
                  {{ streetAddress }}
                </a>
              </div>
              <div>
                Telefono:
                <a
                  :href="`tel://${settings.address.phone}`">
                  {{ settings.address.phone }}
                </a>
              </div>
            </div>
          </address>
        </side-box>
      </template>
    </page-head>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import BridgeMixin from '@/mixins/storybridge'
  import PageHead from '@/components/PageHead'
  import FormWrapper from '@/components/form/FormWrapper'
  import SideBox from '@/components/SideBox'
  import ValidatedField from '@/components/form/ValidatedField'

  export default {
    components: {
      PageHead,
      ValidatedField,
      SideBox,
      FormWrapper
    },
    mixins: [ BridgeMixin ],
    async asyncData ({ app, error, store }) {
      store.commit('setStripeColor', '#00283A')
      try {
        const { data } = await app.$storyapi.get('cdn/stories/contacts', {
          version: store.state.version
        })
        return {
          ...data,
          form: {
            email: '',
            name: '',
            message: '',
            privacy: false
          }
        }
      } catch (err) {
        if (!err.response) {
          console.error(err)
          error({ statusCode: 404, message: 'Failed to receive content from API' })
        } else {
          console.error(err.response.data)
          error({ statusCode: err.response.status, message: err.response.data })
        }
      }
    },
    computed: {
      ...mapState([
        'settings'
      ]),
      streetAddress () {
        return `${this.settings.address.street}, ${this.settings.address.postal_code} ${this.settings.address.town}`
      }
    },
    methods: {
      ...mapMutations([
        'setStripeSmall',
        'setStripeRight',
        'setStripeColor'
      ])
    }
  }
</script>

<style lang="scss">
  .contacts__content {
    width: 60%;
  }

  .contacts__title {
    margin-bottom: 20px;
  }

  .contacts__abstract {
    margin-bottom: 50px;
  }

  .contacts__btn {
    background-color: #fff;
    color: $color-text;
  }

  .contacts__privacy {
    margin-bottom: 40px;
  }

</style>
