<script lang="ts" setup>
/// <reference types="google.maps" />
const { onLoaded } = useScriptGoogleMaps({
  apiKey: 'AIzaSyBYJ33u8Z7wmP2sY4EpKrEmxjr-T8QzrrA'
})

const mapDiv = ref()


let markers: any[] = []

let remove_marker = (event: any, new_marker: google.maps.marker.AdvancedMarkerElement) => {
  markers = markers.filter((marker_position) => {
    return JSON.stringify({ lat: Number(marker_position.lat).toFixed(3), lng: Number(marker_position.lng).toFixed(3) }) !==
      JSON.stringify({ lat: Number(event.latLng.lat()).toFixed(3), lng: Number(event.latLng.lng()).toFixed(3) })
  })
  new_marker.map = null;
  localStorage.setItem("markers", JSON.stringify(markers))
}

onMounted(() => {

  let stored_markers = localStorage.getItem('markers')
  if (stored_markers)
    markers = JSON.parse(stored_markers)

  onLoaded(async (instance) => {
    const { Map } = await instance.maps as any as typeof google.maps // upstream google type issue
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    let map = new Map(mapDiv.value, {
      mapId: 'mapid',
      center: { lat: 29.957, lng: -90.062 },
      zoom: 12,
      minZoom: 3,
      draggableCursor: 'default',
      zoomControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,
      clickableIcons: false
    })

    console.log(map);

    for (const marker_position of markers) {
      const position: google.maps.LatLng = new google.maps.LatLng({ lat: marker_position.lat, lng: marker_position.lng })
      const new_marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: 'test',
      });
      new_marker.addListener("click", (event: any) => {

        // console.log(markers)
        // markers = markers.filter((marker_position) => {
        //   return JSON.stringify({ lat: Number(marker_position.lat).toFixed(3), lng: Number(marker_position.lng).toFixed(3) }) !==
        //     JSON.stringify({ lat: Number(event.latLng.lat()).toFixed(3), lng: Number(event.latLng.lng()).toFixed(3) })
        // })
        // console.log(markers)

        // new_marker.map = null;
        remove_marker(event, new_marker)
      })

    }


    map.addListener("click", (event: any) => {
      //console.log('click, event: ', event)
      let position = { lat: event.latLng.lat(), lng: event.latLng.lng() }

      if (position.lat && position.lng) {

        const new_marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: 'test',
        });

        //@ts-ignore
        markers.push({ lat: new_marker.position?.lat, lng: new_marker.position?.lng });

        new_marker.addListener("click", (event: any) => {
          console.log('orig', JSON.stringify({ lat: Number(event.latLng.lat()).toFixed(3), lng: Number(event.latLng.lng()).toFixed(3) }))
          remove_marker(event, new_marker);
        })

        localStorage.setItem("markers", JSON.stringify(markers))

      }
    });
    // Do something with the map


    //<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen
    //referrerpolicy="no-referrer-when-downgrade"
    //src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBYJ33u8Z7wmP2sY4EpKrEmxjr-T8QzrrA&q=Space+Needle,Seattle+WA">
    //</iframe>

  })
})

onBeforeUnmount(() => {
  localStorage.setItem("markers", JSON.stringify(markers))
})



</script>

<template>
  <h3>Make your mark.</h3>
  <div ref="mapDiv" class="map">
  </div>
</template>

<style>
.map {
  width: 100%;
  height: 500px;
}
</style>