// CSVファイルを読み込んでポケモンのデータを処理する関数
function loadPokemonData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            processCSV(xhr.responseText);
        }
    };

    xhr.open('GET', 'pokemon_stat.csv', true);
    xhr.send();
}

function processCSV(csvText) {
    // CSVを解析してデータを処理
    var rows = csvText.split('\n');
    var pokemonData = {};

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].split(',');
        var pokemonName = cells[1]; // 日本語の名前
        var no = cells[0];
        var type1 = cells[19];
        var type2 = cells[20];
        var hp = cells[10];
        var attack = cells[11];
        var defense = cells[12];
        var sattack = cells[13];
        var sdefense = cells[14];
        var speed = cells[15];

        pokemonData[pokemonName] = { no, type1, type2, hp, attack, defense, sattack, sdefense,speed };
    }

    // ポケモン検索のイベントリスナーを追加
    document.getElementById('pokemonSearchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // フォームのデフォルトの送信を防止
        var pokemonName = document.getElementById('pokemonName').value;
        
        var pokemon = pokemonData[pokemonName];
        if (pokemon) {
            // ポケモンの情報を表示
            var info = "No: " + pokemon.no + ", タイプ: " + pokemon.type1 + "/" + pokemon.type2 +
                       ", HP: " + pokemon.hp + ", 攻撃: " + pokemon.attack +
                       ", 防御: " + pokemon.defense + ", 特攻: " + pokemon.sattack + ", 特防: " + pokemon.sdefense + ", 速さ: " + pokemon.speed;
            document.getElementById('pokemonInfo').textContent = info;
        } else {
            // ポケモンが見つからない場合の処理
            document.getElementById('pokemonInfo').textContent = 'ポケモンが見つかりません。';
        }
    });
}

// ページが読み込まれたときにCSVファイルを読み込む
loadPokemonData();
