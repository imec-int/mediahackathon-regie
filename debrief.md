## Voting-app
* Eerste fout: draaide op zelfde machine als mixapp.be
    * voting-app liet dus machine crashen waardoor mixapp.be onbereikbaar was.
    * hadden we dit op verschillende machines gedraaid, dan ging mixapp.be nog laden en konden we een 'even geduld, we zitten met een probleem'-scherm laten zien ;-)

### Load testen
* Lunar Gravity zegt dat ze load testen gedaan hebben.
* Zelf hebben we er nu ook gedaan:

    ```ab -r -k -c 25 -n 1000 http://10.100.11.206:8080/```

    * machine
        * 2.7Ghz Intel Core i5        
        * 4GB RAM 1333Mhz DDR3

    * not loaded
        * Apache neemt 102,4 MB RAM in beslag
        * 9 ```httpd```-processen draaien
        
    * 25 concurrent requests
        * max load 327,68 MB RAM
        * max 39 concurrent ```httpd```-processen
        * werkbaar

    * 50 concurrent requests
        * max load 645,12 MB RAM
        * max 71 concurrent ```httpd```-processen
        * werkbaar, resultaten laden wel traag

    * 100 concurrent requests
        * max load 1230,24 MB RAM
        * max 134 concurrent ```httpd```-processen
        * gaat traag, resultaten laden in schokjes

    * 150 concurrent requests
        * max load 1563,24 MB RAM
        * max 165 concurrent ```httpd```-processen
        * gaat traag, niet echt werkbaar

    * 300 concurrent requests
        * machine hangt vast!


(tussen de testen heen werden de services herstart)






#technical debrief regie voting/hacks op YIB2L
##netwerk
heel veel geconnecteerde phones (simultaan zeker meer dan 180) @Sam, hoeveel unieke?
dwz passwoord was geen enkel probleem ook het idee van de mensen MOETEN via de wifi en niet via 3G was duidelijk en heeft gewerkt. Ik heb niet de indruk dat de wifi onder capaciteit was, kunnen we dit staven met numbers?
Wel heb ik het vermoeden gehad dat de externe link ofwel onder capaciteit was ofwel er soms uitlag. Graag duidelijkheid hierover van IT.

###some numbers plz
- max aantal connecties
- aantal unieke
- ...


##regie-app

###opstelling
aparte server verplicht, ook al was de service niet zwaar en konden we die combineren met een andere hack/svo/voting dit betekend dat als 1 van de servers crashed (MAMP) dat we moeten heel de machine herstarten en dus heel de boel offline nemen.
Steeds de node processen starten in een screen (zoals sam uiteindelijk gedaan heeft tijdens de show) en ssh enablen zodat we remote kunnen ingrijpen.

capaciteit. Regie app zelf ging de eerste keer op de knieen door de MAMP (zoals voorspeld wie gebruikt er nu interval polling in 2014?) wat we beter hadden kunnen doen was deze twee op aparte machines draaien. nog beter was dit NIET uitbesteden denk ik.

Het spreiden van de switch over 3 sec heeft geen zin als iedereen interval polling doet. 

het zetten van SVOs moet apart van het switchen kunnen gaan, maar dat is een verbetering, niet echt een probleem geweest in de regie.

commentaar uit de zaal over de regie was dat het switchen te snel na elkaar ging. We hebben dit gedaan omdat de hacks regelmatig crashten en het geen zin had om de mensne op de hacks te laten.

##mix-midi
worked as intended, maar CDD hebben niet bij ieder nummer midi doorgestuurd, wat wel de afspraak was. Last minute aanpassing is voor artist stresserend en dus niet op aangedrongen. 
Voor de rest geen issues. 

##hackABlights
heeft heel de tijd gewerkt, was goed voorzien  op mogelijkheden van licht, maar er was te weing tijd om de lichttafel volledig te programmeren, niemand heeft dat gemerkt.

##voting
- wrong software technology
- wrong hardware
- bad design choices
- geen load testing gedaan (onze fout? wat was gevraagd?)

##hacks algemeen
we hadden kunnen sommige hacks (zoals mediagoo & pale eyes) enkel voor een maximum aantal mensen activeren (en de andere mensen een wachtscherm geven) wat de schaalbaarheid en de effecten ten goede had kunnen komen. Communicatie met overlays was heel duidelijk. Er hebben heel veel mensen meegedaan (of misschien beter proberen meedoen).


##epleptic
veel last minute aanpassingen, was goed zolang de mididata doorkwam. CDD hadden echter niet op alle tracks genoeg data of het was het verkeerde kanaal. mensen hielden telefoon naar zichzelf gericht, ik dat dat iedereen dat naar het podium ging richten.
Audio

##pale eyes
effect als het werkt 5/5 
werkte pas bij <60 mensen geconnecteerd

##hexamusic
externe connectie weg? zelden tweets te zien...daardoor hebben we de hack minder vaak getoond.

##mediagoo
heeft pas gewerkt bij heel weinig connected people (<40)
effect heel goed op groot scherm

##sounddefender
2 soorten mensen, zij die het snappen en zij die het niet snappen. ca 50/50
degenen die het snapten waren onder de indruk van idee en uitwerking
dit is de enige interactieve hack die nooit platgegaan is (epleptic eigenlijk ook niet maar had te lijden onder tracks zonder midi data en was toen onbruikbaar)

##oscilloscoop
offline en vaak fallback, werkte goed. Ook de midi lichten hier aan toegevoegd deden hun ding. De hack had wel bediening nodig, maar kan in princioe via midi aangestuurd worden vanuit de CDD setup.
