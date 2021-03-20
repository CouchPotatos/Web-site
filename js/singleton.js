class Singleton {

  constructor(a) {
    if (!instance){
      instance = this;
      instance.count = a;
    };
    return instance;
  };

  createInstance = function () {
    return {
      getCounter: getCounter,
    }
  }

  getNumber(){
    return instance.count();
  };

  increaseCount(){
    return instance.count++;
   };
}