import { t, use } from '../locale';
export default {
  methods: {
      t(args){
          return t(args);
      },

      use(args){
        return use(args);
      }
  }
};