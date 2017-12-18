<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Connect</h3>
            <p class="subtitle has-text-grey">
              Connect to a server using <br> &lt;IP-ADDRESS&gt;:&lt;PORT&gt;
            </p>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input is-large" type="text" placeholder="i.e.: 10.0.0.1:8082" autofocus=""
                      v-model="address"
                      required pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}$">
                  </div>
                </div>
                <a class="button is-block is-info is-large"
                   @click="onClick">Connect</a>
              </form>
            </div>
            <div style="height: 300px; overflow: auto;">
              <pre style="text-align: left;" v-if="log.length > 0">{{ log.join('\n') }}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  inject: ['bus', 'client'],
  data () {
    return {
      log: [],
      address: 'localhost:8082'
    }
  },
  methods: {
    addLog (msg) {
      function pad (digit) {
        if (digit < 10) return '0' + digit
        return digit
      }
      let d = new Date()
      let h = pad(d.getHours())
      let m = pad(d.getMinutes())
      let s = pad(d.getSeconds())
      let timestamp = `${h}:${m}:${s}`
      this.log.push(`${timestamp}: ${msg}`)
    },
    onClick () {
      if (this.client.socket.readyState === 1) {
        this.client.socket.close()
      }
      this.addLog(`Connecting to: ${this.address}`)
      let [ip, port] = this.address.split(':')
      var state = this.client.init(ip, port)
      state.then(() => {
        this.addLog(`Connected to: ${this.address}`)
        this.$router.push({ name: 'app' })
      }).catch(err => {
        if (err.type === 'error') {
          this.addLog(`Could not connect to ${this.address}`)
        }
      })
    }
  }
}
</script>

<style>
html,body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
