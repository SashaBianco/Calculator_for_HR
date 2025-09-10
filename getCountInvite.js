const cutoffInvite = 0.6 //отсечка по приглашенным 0.6
const cutoffIncome = 0.65 //отсечка по доходимости 0.65
const normIncome = 0.7 //план по доходимости 0.7
const normInvite = 0.65 //план по прилгашенным 0.65

function getValuesFromForm () {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
    });
    countInterwiew = parseInt(document.getElementById('interview').value) //кол-во собеседований
    countInvite = parseInt(document.getElementById('invite').value) //кол-во приглашенных
    countPaccedSecurity = parseInt(document.getElementById('security').value) //кол-во прошедших СБ
    countIncome = parseInt(document.getElementById('income').value) //кол-во дошедших
    countWaiting = parseInt(document.getElementById('waiting').value) //кол-во ожидаемых


    
    if (isNaN(countInterwiew) || isNaN(countInvite) || isNaN(countPaccedSecurity)  || isNaN(countIncome)  || isNaN(countWaiting))  {
        console.log('Ошибка. Не заполнены все поля!')
        document.getElementsByClassName('container')[0].classList.remove('container_visible')
    } else {
        let arrayCutoffYield = getNeedValuesYield(countInterwiew, countInvite, countPaccedSecurity, countIncome, countWaiting, cutoffIncome) //отсечка доходимости
        let arrayNormYield = getNeedValuesYield(countInterwiew, countInvite, countPaccedSecurity, countIncome, countWaiting, normIncome) //норма доходимости
        let arrayCutoffYieldNonWaiting = getNeedValuesYield(countInterwiew, countInvite, countPaccedSecurity, countIncome, 0, cutoffIncome) //отсечка доходимости без дошедших
        let arrayNormYieldNonWaiting = getNeedValuesYield(countInterwiew, countInvite, countPaccedSecurity, countIncome, 0, normIncome) //отсечка доходимости без дошедших
        let arrayCutoffInvite = getNeedValuesInvite(countInterwiew, countInvite, cutoffInvite) //отсечка приглашаемости
        let arrayNormInvite = getNeedValuesInvite(countInterwiew, countInvite, normInvite) //норма приглашаемости 
        
        let temple1 = `<ul>
            <li> Провести собеседований: <b>${arrayCutoffYield[0] - countInterwiew}</b> </li>
            <li> Пригласить дальше: <b>${arrayCutoffYield[1] - countInvite}</b> кандидата/кандидатов</li>
            <li> Чтобы прошли СБ: <b>${arrayCutoffYield[2] - countPaccedSecurity}</b> кандидата/кандидатов</li>
            <li> Чтобы дошли ожидаемые: <b>${countWaiting}</b> кандидата/кандидатов</li>
            <br>Будет процент: <b>${arrayCutoffYield[3] * 100}% </b>
            <br><br>или<br><br>
            <li> Провести собеседований: <b>${arrayCutoffYieldNonWaiting[0] - countInterwiew}</b> </li>
            <li> Пригласить дальше: <b>${arrayCutoffYieldNonWaiting[1] - countInvite}</b> кандидата/кандидатов</li>
            <li> Чтобы <b>${arrayCutoffYieldNonWaiting[2] - countPaccedSecurity}</b> кандидата/кандидатов прошли СБ.</li>
            <br>Будет процент: <b>${arrayCutoffYieldNonWaiting[3] * 100}% </b>
        </ul>`
        let temple2 = `<ul>
            <li> Провести собеседований: <b>${arrayNormYield[0] - countInterwiew}</b> </li>
            <li> Пригласить дальше: <b>${arrayNormYield[1] - countInvite}</b> кандидата/кандидатов</li>
            <li> Чтобы <b>${arrayNormYield[2] - countPaccedSecurity}</b> кандидата/кандидатов прошли СБ</li>
            <li> Чтобы дошли ожидаемые: <b>${countWaiting}</b> кандидата/кандидатов</li>
            <br>Будет процент: <b>${arrayNormYield[3] * 100}% </b></li>
            <br><br>или<br><br>
            <li> Провести собеседований: <b>${arrayNormYieldNonWaiting[0] - countInterwiew}</b> </li>
            <li> Пригласить дальше: <b>${arrayNormYieldNonWaiting[1] - countInvite}</b> кандидата/кандидатов</li>
            <li> Чтобы прошли СБ: <b>${arrayNormYieldNonWaiting[2] - countPaccedSecurity}</b> кандидата/кандидатов</li>
            <br>Будет процент: <b>${arrayNormYieldNonWaiting[3] * 100}% </b>
        </ul>`

        let temple3 = `<ul>
            <li> Провести собеседований: <b>${arrayCutoffInvite[0] - countInterwiew}</b> </li>
            <li> Пригласить дальше: <b>${arrayCutoffInvite[1] - countInvite}</b> кандидата/кандидатов</li>
            <li> Тогда получится процент: <b>${arrayCutoffInvite[2] * 100}%</b></li>
        </ul>`

        let temple4 = `<ul>
            <li> Провести собеседований: <b>${arrayNormInvite[0] - countInterwiew}</b> </li>
            <li> Пригласить дальше: <b>${arrayNormInvite[1] - countInvite}</b> кандидата/кандидатов</li>
            <li> Тогда получится процент: <b>${arrayNormInvite[2] * 100}% </b></li>
        </ul>`

        document.getElementsByClassName('div_arrayCutoffYield')[0].innerHTML = temple1
        document.getElementsByClassName('div_arrayNormYield')[0].innerHTML = temple2
        document.getElementsByClassName('div_arrayCutoffInvite')[0].innerHTML = temple3
        document.getElementsByClassName('div_arrayNormInvite')[0].innerHTML = temple4
        document.getElementsByClassName('container_values')[0].innerHTML = `Текущий процент доходимости: ${arrayCutoffYield[4] * 100}%<br>Текущий процент приглашаемости: ${(parseFloat(parseInt(countInvite)/parseInt(countInterwiew)).toFixed(2)) * 100}%<br>`
        document.getElementsByClassName('container')[0].className += ' container_visible'
        }
}

function getNeedValuesYield(interviews, invites, security, incomes, waitings, border) {
    let people = parseInt(incomes) + parseInt(waitings)
    let percentage = parseFloat((people/parseInt(security)).toFixed(2))
    let percentageNOW = parseFloat((incomes/parseInt(security)).toFixed(2))
    console.log(percentageNOW)
    console.log(percentage)
    border = parseFloat(border)

    if (percentage >= border) {
        return [interviews, invites, security, percentage, percentageNOW]
    } else {
        while (true) {
            percentage = parseFloat((people/security).toFixed(2))
            if (percentage >= border) {
                console.log([interviews, invites, security, percentage, percentageNOW])
                return [interviews, invites, security, percentage, percentageNOW]
            } else {
                interviews += 1
                invites += 1
                security +=1
                people +=1
            }
        }
    }
}

function getNeedValuesInvite(interviews, invites, border) {
    let percentage = parseFloat((invites/parseInt(interviews)).toFixed(2))
    border = parseFloat(border)
    if (percentage >= border) {
        return [interviews, invites, percentage]
    } else {
        while (true) {
            percentage = parseFloat((invites/interviews)).toFixed(2)
            console.log(invites)
            console.log(percentage)
            if (percentage >= border) {
                return [interviews, invites, percentage]
            } else {
                interviews += 1
                invites += 1
            }
        }
    }
}

