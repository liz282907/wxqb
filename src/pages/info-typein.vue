<template>
    <div>
        <aside class="info-nav">
            <ul class="">
                <li v-for="section in locals.sections" class="info-section" >
                    <a :href="section.id">{{section.name}}</a>
                    <ul class="info-nav-item">
                        <li v-for="item in section.children">
                            <a :href="item.id">{{item.name}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
        <div class="info-main">

        </div>
    </div>



</template>

<script>
import { sections } from '../../const/constants'

export default {
  data(){
    return {
        locals:{
            sections,
        }
    }
  },
  computed:{

  },
  components: {

  },
  methods:{

  }
};
</script>

