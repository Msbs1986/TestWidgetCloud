require([
  'UWA/Core',
  'UWA/Controls/Abstract',
  'DS/WAFData/WAFData'
], function (UWA, Abstract, WAFData) {

  widget.addEvent('onLoad', function () {
    // Bouton pour obtenir le ticket
    document.getElementById('getTicketBtn').addEventListener('click', function () {
      const url = "https://r1132101389013-eu1.iam.3dexperience.3ds.com/login?action=get_auth_params";

      WAFData.authenticatedRequest(url, {
        method: 'GET',
        type: 'json',
        onComplete: function (data) {
          const ticket = data.lt;
          document.getElementById('result').innerHTML = `<strong>Login Ticket:</strong> ${ticket}`;
        },
        onFailure: function (error) {
          document.getElementById('result').innerHTML = `<span style="color:red;">Erreur : ${error}</span>`;
        }
      });
    });
	
	document.getElementById('getCsrfBtn').addEventListener('click', function () {
	const tenant = 'votre_tenant'; // Remplace par la valeur réelle
	const url = `https://r1132101389013-eu1-space.3dexperience.3ds.com/enovia/resources/v1/application/CSRF?tenant=3dxatrdev`;

 
	WAFData.authenticatedRequest(url, {
	    method: 'GET',
	    type: 'json',
	    onComplete: function (data) {
	      const csrfValue = data.csrf?.value;
	      document.getElementById('csrfResult').innerHTML = `<strong>CSRF Token:</strong> ${csrfValue}`;
	    },
	    onFailure: function (error) {
	      document.getElementById('csrfResult').innerHTML = `<span style="color:red;">Erreur : ${error}</span>`;
	    }
	  });
	});



    // Gestion du drag & drop
    const dropZone = document.getElementById('dropZone');

    widget.addEvent('onDragEnter', function () {
      dropZone.classList.add('dragover');
    });

    widget.addEvent('onDragLeave', function () {
      dropZone.classList.remove('dragover');
    });

    widget.addEvent('onDrop', function (data) {
      dropZone.classList.remove('dragover');
      const objects = JSON.parse(data);
      const container = document.getElementById('droppedObjects');
      container.innerHTML = "<h4>Objets déposés :</h4>";

      objects.forEach(obj => {
        const div = document.createElement('div');
        div.className = "object-item";
        div.innerHTML = `• <strong>${obj.name}</strong> (${obj.type}) - ID: ${obj.id}`;
        container.appendChild(div);
      });
    });
  });
});
