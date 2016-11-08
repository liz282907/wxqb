<template>
    <div class="my-info-container">
        <aside class="info-nav">
            <ul >
                <li v-for="section in locals.sections" class="info-out-navitem" >
                    <a :href="'#'+section.id">{{section.name}}</a>
                    <ul >
                        <li v-for="item in section.children" class="info-inner-navitem">
                            <a :href="'#'+item.id">{{item.name}}</a>
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

