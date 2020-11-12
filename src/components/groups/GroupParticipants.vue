<template>
  <div class="q-pa-md row fit">
    <q-card class="my-card" bordered>
      <q-table
        class="my-sticky-header-table full-width"
        :data="group.participants"
        :columns="columns"
        row-key="name"
        flat
        dense
        :filter="filter"
        no-data-label="No one is attending this group yet"
        no-results-label="No one like that is a member of this group"
      >
        <template v-slot:top-left>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:top-right>
          <q-btn-group rounded>
            <q-btn
              :disabled="hasParticipants"
              color="accent"
              outline
              size="sm"
              rounded
              icon="mail"
              label="all participants"
            />
            <q-btn
              color="positive"
              outline
              size="sm"
              rounded
              icon="plus"
              label="Add participant"
              @click="persistent = true"
            />
          </q-btn-group>
        </template>

        <template v-slot:body-cell-contact="props">
          <q-td :props="props">
            <div>
              <q-btn round size="xs" color="accent">
                <q-icon name="mail" color="white"></q-icon>
              </q-btn>
            </div>
          </q-td>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </q-card>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="q-ma-none">
        <q-card-section class="q-pa-none">
          <AddParticipants @participant-selected="collectParticipants" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            v-close-popup
            @click="addParticipantsToGroup"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import AddParticipants from "components/groups/AddParticipants";
import { mapMutations } from "vuex";
export default {
  name: "GroupParticipants",
  props: {
    group: { type: Object }
  },
  components: {
    AddParticipants
  },
  data() {
    return {
      filter: "",
      persistent: false,
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "parent",
          align: "center",
          label: "Parent",
          field: "parent",
          sortable: true
        },

        {
          name: "contact",
          label: "Contact",
          field: "contact",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "remove",
          label: "Remove",
          field: "remove"
        }
      ],
      participantsToAdd: []
    };
  },

  computed: {
    hasParticipants() {
      return this.group.participants.length <= 0;
    },

    participantsData() {
      let participantsTemp = [];

      this.group.participants.forEach(id => {});

      return participantsTemp;
    }
  },

  methods: {
    ...mapMutations("groups", ["selectedGroupParticipants"]),
    collectParticipants(payload) {
      this.participantsToAdd = payload;
    },

    addParticipantsToGroup() {
      this.selectedGroupParticipants(this.participantsToAdd);
    }
  }
};
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
}
</style>
