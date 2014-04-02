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
offline/fallback, werkte goed ook de midi lichten hier aan toegevoegd deden hun ding. De hack had wel bediening nodig, maar kan in princioe via midi aangestuurd worden vanuit de CDD setup.
