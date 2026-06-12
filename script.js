// Utilidades comunes
    function ip2long(ip) {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
    }

    function long2ip(long) {
        return [ (long >>> 24), (long >> 16 & 255), (long >> 8 & 255), (long & 255) ].join('.');
    }

    // Funciones CIDR
    function calcularCIDR() {
        const ipStr = document.getElementById('cidr-ip').value;
        const prefix = parseInt(document.getElementById('cidr-prefix').value);
        const resDiv = document.getElementById('cidr-result');

        if(!ipStr || isNaN(prefix) || prefix < 0 || prefix > 32) {
            alert("Datos inválidos para CIDR.");
            return;
        }

        const ipLong = ip2long(ipStr);
        const maskLong = ~((1 << (32 - prefix)) - 1) >>> 0;
        const netLong = (ipLong & maskLong) >>> 0;
        const broadLong = (netLong | ~maskLong) >>> 0;
        
        const totalHosts = Math.pow(2, 32 - prefix);
        const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;

        resDiv.style.display = "block";
        resDiv.innerHTML = `
            <p><strong>Máscara de red:</strong> ${long2ip(maskLong)}</p>
            <p><strong>Dirección de Red:</strong> ${long2ip(netLong)}</p>
            <p><strong>Primer Host Útil:</strong> ${long2ip(netLong + 1)}</p>
            <p><strong>Último Host Útil:</strong> ${long2ip(broadLong - 1)}</p>
            <p><strong>Dirección de Broadcast:</strong> ${long2ip(broadLong)}</p>
            <p><strong>Hosts Utilizables:</strong> ${usableHosts}</p>
        `;
    }

    // Funciones VLSM
    function calcularVLSM() {
        const ipStr = document.getElementById('vlsm-ip').value;
        const prefix = parseInt(document.getElementById('vlsm-prefix').value);
        const hostsStr = document.getElementById('vlsm-hosts').value;
        const resDiv = document.getElementById('vlsm-result');

        if(!ipStr || isNaN(prefix) || !hostsStr) {
            alert("Datos inválidos para VLSM.");
            return;
        }

        let hosts = hostsStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
        hosts.sort((a, b) => b - a); // Ordenar de mayor a menor

        let currentIpLong = ip2long(ipStr);
        let tableHTML = `
            <table>
                <tr>
                    <th>Subred</th><th>Hosts Req.</th><th>Hosts Disp.</th>
                    <th>Red</th><th>Prefijo</th><th>Máscara</th>
                    <th>Rango Útil</th><th>Broadcast</th>
                </tr>
        `;

        hosts.forEach((reqHosts, index) => {
            // Calcular el prefijo necesario (n hosts + 2 para red/broadcast)
            let neededBits = Math.ceil(Math.log2(reqHosts + 2));
            let subPrefix = 32 - neededBits;
            let availableHosts = Math.pow(2, neededBits) - 2;

            let maskLong = ~((1 << neededBits) - 1) >>> 0;
            let netLong = (currentIpLong & maskLong) >>> 0;
            let broadLong = (netLong | ~maskLong) >>> 0;

            tableHTML += `
                <tr>
                    <td>Subred ${index + 1}</td>
                    <td>${reqHosts}</td>
                    <td>${availableHosts}</td>
                    <td>${long2ip(netLong)}</td>
                    <td>/${subPrefix}</td>
                    <td>${long2ip(maskLong)}</td>
                    <td>${long2ip(netLong + 1)} - ${long2ip(broadLong - 1)}</td>
                    <td>${long2ip(broadLong)}</td>
                </tr>
            `;
            
            // Avanzar la IP actual al siguiente bloque
            currentIpLong = broadLong + 1;
        });

        tableHTML += `</table>`;
        resDiv.style.display = "block";
        resDiv.innerHTML = tableHTML;
    }