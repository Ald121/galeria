angular.module('fotosApp').factory('pedidosServices',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      pedidosList: pedidosList,
      deletePedido:deletePedido,
      addPedido:addPedido,
      PedidoDetails:PedidoDetails,
      procesPedido:procesPedido,
      pedidosListCliente:pedidosListCliente,
      getClientData:getClientData
    });

    function getClientData(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'getClientData', dataSend);
    }

    function pedidosList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'pedidosList', dataSend);
    }

    function pedidosListCliente(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'pedidosListCliente', dataSend);
    }

    function addPedido(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
        dataSend.user = $localStorage.user.datos.id;
      }
       return $http.post(generalService.dir() + 'addPedido', dataSend);
    }

    function deletePedido(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'deletePedido', dataSend);
    }

    function PedidoDetails(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'PedidoDetails', dataSend);
    }

    function procesPedido(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'procesPedido', dataSend);
    }

    }])