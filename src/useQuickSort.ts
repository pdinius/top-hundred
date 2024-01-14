import { useEffect, useState } from "react";
import { PROGRESS_KEY, SAVED_KEY } from "./constants";
import { useRouter } from "next/router";
import { GameData } from "./types/game-types";

const shuffle = <T>(array: Array<T>): Array<T> => {
  let m = array.length;
  let t: T;
  let i: number;

  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const TEMPORARY_CURRENT_JSON: Array<GameData> = shuffle([
  {
    id: "283135",
    name: "Magic Maze on Mars",
    image:
      "https://cf.geekdo-images.com/cOOM-MgnZK_JVlW5YpHCzA__thumb/img/Q27tXHolG_z3m9hsY27mvHT1LwM=/fit-in/200x150/filters:strip_icc()/pic4867261.jpg",
    fullSize:
      "https://cf.geekdo-images.com/cOOM-MgnZK_JVlW5YpHCzA__original/img/1jJ4o7Il30ASqchZTZGTwh1Svic=/0x0/filters:format(jpeg)/pic4867261.jpg",
    selected: true,
  },
  {
    id: "391163",
    name: "Forest Shuffle",
    image:
      "https://cf.geekdo-images.com/08bC8NviSTNc4Zvur4pueA__thumb/img/Xq8TNBmMl3Z7DoynvbUXchFAztc=/fit-in/200x150/filters:strip_icc()/pic7578350.jpg",
    fullSize:
      "https://cf.geekdo-images.com/08bC8NviSTNc4Zvur4pueA__original/img/GcBtTHjdPXagHE-IOCpQ0he6rN4=/0x0/filters:format(jpeg)/pic7578350.jpg",
    selected: true,
  },
  {
    id: "355483",
    name: "Wandering Towers",
    image:
      "https://cf.geekdo-images.com/602eY-xlgkaL3gtyZ7QVVQ__thumb/img/6u9GKTBVH0wRAhhpOi1kn3sSNeo=/fit-in/200x150/filters:strip_icc()/pic7347437.jpg",
    fullSize:
      "https://cf.geekdo-images.com/602eY-xlgkaL3gtyZ7QVVQ__original/img/0pBr7ImqUOKLPUb12_r0_R0MD1M=/0x0/filters:format(jpeg)/pic7347437.jpg",
    selected: true,
  },
  {
    id: "332772",
    name: "Revive",
    image:
      "https://cf.geekdo-images.com/V0OZ9QR0pC9G5t5i9MoZTQ__thumb/img/NPtXuKlsnfPORSn6kpTcf-ZdEF0=/fit-in/200x150/filters:strip_icc()/pic6950224.jpg",
    fullSize:
      "https://cf.geekdo-images.com/V0OZ9QR0pC9G5t5i9MoZTQ__original/img/NxxAoxVxMNkDGEkD3aoobPL14dI=/0x0/filters:format(jpeg)/pic6950224.jpg",
    selected: true,
  },
  {
    id: "285192",
    name: "Destinies",
    image:
      "https://cf.geekdo-images.com/oaD1ZQ3yGj6lacLdtqgdnQ__thumb/img/1mCz7HPEFMeqaqJHsDZwEUc9ftw=/fit-in/200x150/filters:strip_icc()/pic5558118.png",
    fullSize:
      "https://cf.geekdo-images.com/oaD1ZQ3yGj6lacLdtqgdnQ__original/img/LJXy5--WfYNypO-Xd7nhkzU5Xzs=/0x0/filters:format(png)/pic5558118.png",
    selected: true,
  },
  {
    id: "364073",
    name: "Splendor Duel",
    image:
      "https://cf.geekdo-images.com/V1PyFDPNFY4bJFgreLPxmQ__thumb/img/E0OuG2X4HsbOdCh1uLyZZcMiapQ=/fit-in/200x150/filters:strip_icc()/pic6929347.jpg",
    fullSize:
      "https://cf.geekdo-images.com/V1PyFDPNFY4bJFgreLPxmQ__original/img/NelFMJToi6WYyDQheBZiwCP7-qE=/0x0/filters:format(jpeg)/pic6929347.jpg",
    selected: true,
  },
  {
    id: "492",
    name: "Aladdin&#039;s Dragons",
    image:
      "https://cf.geekdo-images.com/GFgQQ4ZMH8kr3LsGvYHZHw__thumb/img/Cwelgy3mEzc1hUD5z30pKMuvqtQ=/fit-in/200x150/filters:strip_icc()/pic143493.jpg",
    fullSize:
      "https://cf.geekdo-images.com/GFgQQ4ZMH8kr3LsGvYHZHw__original/img/aGawfUSiBKA_0TuH0A2k-NaaoeE=/0x0/filters:format(jpeg)/pic143493.jpg",
    selected: true,
  },
  {
    id: "246784",
    name: "Cryptid",
    image:
      "https://cf.geekdo-images.com/qrPLpAnhFgc470ZRuXlvbg__thumb/img/ZFL0o-lhnuWE21Sa9YS8qi8ayGU=/fit-in/200x150/filters:strip_icc()/pic4037705.jpg",
    fullSize:
      "https://cf.geekdo-images.com/qrPLpAnhFgc470ZRuXlvbg__original/img/QenUCVaFRry4-wlimHmeLn226Bo=/0x0/filters:format(jpeg)/pic4037705.jpg",
    selected: true,
  },
  {
    id: "110327",
    name: "Lords of Waterdeep",
    image:
      "https://cf.geekdo-images.com/-hk8f8iGk_DyWyMrfiPBkg__thumb/img/dBqYOO8uLXAumxUGuYtuiRGQ1Y8=/fit-in/200x150/filters:strip_icc()/pic1116080.jpg",
    fullSize:
      "https://cf.geekdo-images.com/-hk8f8iGk_DyWyMrfiPBkg__original/img/GWNOhno3y7g0XE00VacKaRxoczk=/0x0/filters:format(jpeg)/pic1116080.jpg",
    selected: true,
  },
  {
    id: "172",
    name: "For Sale",
    image:
      "https://cf.geekdo-images.com/iICpck1AVQFDBmBnpFhinw__thumb/img/QdHxALRXOJW9-vCBJ0yLrIbNIVs=/fit-in/200x150/filters:strip_icc()/pic2585045.jpg",
    fullSize:
      "https://cf.geekdo-images.com/iICpck1AVQFDBmBnpFhinw__original/img/ORsfBp1HnavtqHddm_ls6Z8h0yg=/0x0/filters:format(jpeg)/pic2585045.jpg",
    selected: true,
  },
  {
    id: "169426",
    name: "Roll Player",
    image:
      "https://cf.geekdo-images.com/enmQAOQl99U6wiQvZoL5GQ__thumb/img/zdtrILXRjphkt5HYP0tuxzlenG4=/fit-in/200x150/filters:strip_icc()/pic2556921.jpg",
    fullSize:
      "https://cf.geekdo-images.com/enmQAOQl99U6wiQvZoL5GQ__original/img/iiKhufERu8v8JpErc5kUoO8WiNw=/0x0/filters:format(jpeg)/pic2556921.jpg",
    selected: true,
  },
  {
    id: "237182",
    name: "Root",
    image:
      "https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__thumb/img/ACovMZzGGIsBRyEQXFnsT8282NM=/fit-in/200x150/filters:strip_icc()/pic4254509.jpg",
    fullSize:
      "https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__original/img/E0s2LvtFA1L5YKk-_44D4u2VD2s=/0x0/filters:format(jpeg)/pic4254509.jpg",
    selected: true,
  },
  {
    id: "365727",
    name: "Make the Difference",
    image:
      "https://cf.geekdo-images.com/cJASsWBYDDkv5EPCj1vnOg__thumb/img/bdbIjUlEvLAt6aiPEgXG2LDLWZA=/fit-in/200x150/filters:strip_icc()/pic7607523.png",
    fullSize:
      "https://cf.geekdo-images.com/cJASsWBYDDkv5EPCj1vnOg__original/img/ug_FifqCkPwuy8MV6ZJzaWX89qE=/0x0/filters:format(png)/pic7607523.png",
    selected: true,
  },
  {
    id: "269144",
    name: "Hadara",
    image:
      "https://cf.geekdo-images.com/xfYn6KPoV2CfBnLUymzfZQ__thumb/img/3jsKuRUEZDmz7QzerxmRcr5-PGI=/fit-in/200x150/filters:strip_icc()/pic4766230.jpg",
    fullSize:
      "https://cf.geekdo-images.com/xfYn6KPoV2CfBnLUymzfZQ__original/img/-t5pfflPrl7xmPr8fUnj4E2hrSk=/0x0/filters:format(jpeg)/pic4766230.jpg",
    selected: true,
  },
  {
    id: "161970",
    name: "Alchemists",
    image:
      "https://cf.geekdo-images.com/ztNshEv3Fsm46HCJaEOFPw__thumb/img/-a0oJ_E49V_7PDW78W7KIyS3rF8=/fit-in/200x150/filters:strip_icc()/pic2241156.png",
    fullSize:
      "https://cf.geekdo-images.com/ztNshEv3Fsm46HCJaEOFPw__original/img/SP4ItZ27dLweUPbz_bF7C-P7GtA=/0x0/filters:format(png)/pic2241156.png",
    selected: true,
  },
  {
    id: "236457",
    name: "Architects of the West Kingdom",
    image:
      "https://cf.geekdo-images.com/OAX7HfOz-9N60StgADzd0g__thumb/img/sBMaoJ-Kz74lJ6djcl-NNMTr0Wo=/fit-in/200x150/filters:strip_icc()/pic3781944.png",
    fullSize:
      "https://cf.geekdo-images.com/OAX7HfOz-9N60StgADzd0g__original/img/x2Y_DYWrzzleMETfnu7Jm3R8jPo=/0x0/filters:format(png)/pic3781944.png",
    selected: true,
  },
  {
    id: "117959",
    name: "Las Vegas",
    image:
      "https://cf.geekdo-images.com/aQJ0HRKx2mobP0g3FCeR_Q__thumb/img/7g-l6beAu5RtsAykBhoO7kMWexc=/fit-in/200x150/filters:strip_icc()/pic1261796.jpg",
    fullSize:
      "https://cf.geekdo-images.com/aQJ0HRKx2mobP0g3FCeR_Q__original/img/0lvxwLBBElto13XPMisB0ZCTSkA=/0x0/filters:format(jpeg)/pic1261796.jpg",
    selected: true,
  },
  {
    id: "136888",
    name: "Bruges",
    image:
      "https://cf.geekdo-images.com/A8JeebUT3mu4zUmYs9clDQ__thumb/img/0O-Yp8KcLpb_lUXGm3AgymPJKos=/fit-in/200x150/filters:strip_icc()/pic1652004.jpg",
    fullSize:
      "https://cf.geekdo-images.com/A8JeebUT3mu4zUmYs9clDQ__original/img/v5d03Jz4di-I6S6C1iihj6JEeoY=/0x0/filters:format(jpeg)/pic1652004.jpg",
    selected: true,
  },
  {
    id: "15817",
    name: "Manila",
    image:
      "https://cf.geekdo-images.com/BO_FmqcuNAG6JKuQHAfhxg__thumb/img/3Dje4RLJm5OdYwtZVzeI6fvF4J8=/fit-in/200x150/filters:strip_icc()/pic2265502.jpg",
    fullSize:
      "https://cf.geekdo-images.com/BO_FmqcuNAG6JKuQHAfhxg__original/img/SnVeUqjk9ow21NgzvsfLuBV65sQ=/0x0/filters:format(jpeg)/pic2265502.jpg",
    selected: true,
  },
  {
    id: "308765",
    name: "Praga Caput Regni",
    image:
      "https://cf.geekdo-images.com/aUPeXVwc40xrgud2XeZwyA__thumb/img/1TYDRYM7iz0-jLJ-YZj6d5bhweg=/fit-in/200x150/filters:strip_icc()/pic5671087.png",
    fullSize:
      "https://cf.geekdo-images.com/aUPeXVwc40xrgud2XeZwyA__original/img/WbCD6iqzBhVucS7uRwYvtku5zD0=/0x0/filters:format(png)/pic5671087.png",
    selected: true,
  },
  {
    id: "196340",
    name: "Yokohama",
    image:
      "https://cf.geekdo-images.com/ocI_xrJ7A-cDTTMUoYBNzw__thumb/img/FV_oHALnYd3AHo0FPCfYMkSedBM=/fit-in/200x150/filters:strip_icc()/pic3600984.jpg",
    fullSize:
      "https://cf.geekdo-images.com/ocI_xrJ7A-cDTTMUoYBNzw__original/img/7C0EpAhp67svA0XQ1FjuhrNvESU=/0x0/filters:format(jpeg)/pic3600984.jpg",
    selected: true,
  },
  {
    id: "264055",
    name: "Draftosaurus",
    image:
      "https://cf.geekdo-images.com/JahbLRZ_jEe8P8gisXUtJw__thumb/img/XGKi6qBOizS_IdLqOHny-rf0JZw=/fit-in/200x150/filters:strip_icc()/pic4447676.jpg",
    fullSize:
      "https://cf.geekdo-images.com/JahbLRZ_jEe8P8gisXUtJw__original/img/Ug7yXzMmgpaqcv7B_lNTXsAk7_g=/0x0/filters:format(jpeg)/pic4447676.jpg",
    selected: true,
  },
  {
    id: "286096",
    name: "Tapestry",
    image:
      "https://cf.geekdo-images.com/7kqDmkUMGxXHr1wNPA7Gvg__thumb/img/1najF3Bh3QI7k2c9sJeTXznbvPU=/fit-in/200x150/filters:strip_icc()/pic4884996.jpg",
    fullSize:
      "https://cf.geekdo-images.com/7kqDmkUMGxXHr1wNPA7Gvg__original/img/e6rS0PyrVlPpJjCsWPmCaGg9PXc=/0x0/filters:format(jpeg)/pic4884996.jpg",
    selected: true,
  },
  {
    id: "202408",
    name: "Adrenaline",
    image:
      "https://cf.geekdo-images.com/TiNI7bUCR2RPFMlvKEC9TQ__thumb/img/nnWEA6jjVsxPSuEC_Ooph9kzO_g=/fit-in/200x150/filters:strip_icc()/pic3476604.jpg",
    fullSize:
      "https://cf.geekdo-images.com/TiNI7bUCR2RPFMlvKEC9TQ__original/img/MEvPkkVu15k4DWM8CS41a-j5TL8=/0x0/filters:format(jpeg)/pic3476604.jpg",
    selected: true,
  },
  {
    id: "170216",
    name: "Blood Rage",
    image:
      "https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__thumb/img/NLhVdU8xazrgS5dA6nVCYmN2DNI=/fit-in/200x150/filters:strip_icc()/pic2439223.jpg",
    fullSize:
      "https://cf.geekdo-images.com/HkZSJfQnZ3EpS214xtuplg__original/img/Myy6IPDJDzLoPdXrPXVZcddBQoQ=/0x0/filters:format(jpeg)/pic2439223.jpg",
    selected: true,
  },
  {
    id: "96848",
    name: "Mage Knight Board Game",
    image:
      "https://cf.geekdo-images.com/DUO2hz9AlLOH8p9ED-lCWg__thumb/img/0bWDfnjzYebauQZrHmjyHkuUttI=/fit-in/200x150/filters:strip_icc()/pic1083380.jpg",
    fullSize:
      "https://cf.geekdo-images.com/DUO2hz9AlLOH8p9ED-lCWg__original/img/PDDH38Vf9NEB_4ODURxcJKNBfVQ=/0x0/filters:format(jpeg)/pic1083380.jpg",
    selected: true,
  },
  {
    id: "239826",
    name: "Dice Fishing: Roll and Catch",
    image:
      "https://cf.geekdo-images.com/12vIUZVqYm2PW6P37GrQSg__thumb/img/pwaZto8_9lAVMXlu8W7YtjnUSdw=/fit-in/200x150/filters:strip_icc()/pic4102667.png",
    fullSize:
      "https://cf.geekdo-images.com/12vIUZVqYm2PW6P37GrQSg__original/img/DFVEVbfsrkyzPHifhtpOBjUqYQk=/0x0/filters:format(png)/pic4102667.png",
    selected: true,
  },
  {
    id: "150312",
    name: "Welcome to the Dungeon",
    image:
      "https://cf.geekdo-images.com/2w4G4Ltx0FFwW1XgkXg7Hw__thumb/img/eSMZGeOZLy66Iqw66Kyd4Qfd7nI=/fit-in/200x150/filters:strip_icc()/pic2436689.jpg",
    fullSize:
      "https://cf.geekdo-images.com/2w4G4Ltx0FFwW1XgkXg7Hw__original/img/3Lopg5JaWBkfqBTPNWmb0AndhKY=/0x0/filters:format(jpeg)/pic2436689.jpg",
    selected: true,
  },
  {
    id: "193558",
    name: "The Oracle of Delphi",
    image:
      "https://cf.geekdo-images.com/tZFlvhcA97SjyNGurpU6Ag__thumb/img/fMd29Q6_L8VxO4tLCJROZT7p4is=/fit-in/200x150/filters:strip_icc()/pic3574541.jpg",
    fullSize:
      "https://cf.geekdo-images.com/tZFlvhcA97SjyNGurpU6Ag__original/img/BdmVT0x8dOy65F2IFSYYTyLSqfU=/0x0/filters:format(jpeg)/pic3574541.jpg",
    selected: true,
  },
  {
    id: "205059",
    name: "Mansions of Madness: Second Edition",
    image:
      "https://cf.geekdo-images.com/LIooA9bTdjnE9qmhjL-UFw__thumb/img/kwaa7aI2sMeyWV5JSRKcKrS5hC8=/fit-in/200x150/filters:strip_icc()/pic3118622.jpg",
    fullSize:
      "https://cf.geekdo-images.com/LIooA9bTdjnE9qmhjL-UFw__original/img/Go6c8-ZiXomS8E7X4MBCdDd-aZc=/0x0/filters:format(jpeg)/pic3118622.jpg",
    selected: true,
  },
  {
    id: "136991",
    name: "Loony Quest",
    image:
      "https://cf.geekdo-images.com/iIIGoA267xJDn3RuOfXBeQ__thumb/img/zX7ii2eBry5znNIWJ7-Fisqttbw=/fit-in/200x150/filters:strip_icc()/pic3043308.jpg",
    fullSize:
      "https://cf.geekdo-images.com/iIIGoA267xJDn3RuOfXBeQ__original/img/SVlAXJoSxWW50S0Osn0G6Jk5c3Y=/0x0/filters:format(jpeg)/pic3043308.jpg",
    selected: true,
  },
  {
    id: "93260",
    name: "Summoner Wars: Master Set",
    image:
      "https://cf.geekdo-images.com/JvkUZy1YS7V9GX-7JutIYg__thumb/img/iMkSFXhlP5TaEpjbfjHRhxy0XzY=/fit-in/200x150/filters:strip_icc()/pic923048.jpg",
    fullSize:
      "https://cf.geekdo-images.com/JvkUZy1YS7V9GX-7JutIYg__original/img/XJ0IqhLALib3B7P91Jr2aGA7kVc=/0x0/filters:format(jpeg)/pic923048.jpg",
    selected: true,
  },
  {
    id: "40692",
    name: "Small World",
    image:
      "https://cf.geekdo-images.com/aoPM07XzoceB-RydLh08zA__thumb/img/o3Bw9heVDJRgPYlI_PksCvLAgnM=/fit-in/200x150/filters:strip_icc()/pic428828.jpg",
    fullSize:
      "https://cf.geekdo-images.com/aoPM07XzoceB-RydLh08zA__original/img/bYLzrwZO9u-3h2wyU-PHc8aTOY4=/0x0/filters:format(jpeg)/pic428828.jpg",
    selected: true,
  },
  {
    id: "339958",
    name: "Gutenberg",
    image:
      "https://cf.geekdo-images.com/bDUgQ1CfnrTniZytZ5UlQA__thumb/img/M1mWVYtIfyKxWFO8Pn4KH3aS1-c=/fit-in/200x150/filters:strip_icc()/pic6618432.jpg",
    fullSize:
      "https://cf.geekdo-images.com/bDUgQ1CfnrTniZytZ5UlQA__original/img/s7VbTdeob5YJVueIOWVn2gyJ90o=/0x0/filters:format(jpeg)/pic6618432.jpg",
    selected: true,
  },
  {
    id: "175117",
    name: "Celestia",
    image:
      "https://cf.geekdo-images.com/8kl6m6m_unthBPw9SxoDQQ__thumb/img/vK6rBE3ZjolzG6jEVxJj49MBIc4=/fit-in/200x150/filters:strip_icc()/pic6973677.png",
    fullSize:
      "https://cf.geekdo-images.com/8kl6m6m_unthBPw9SxoDQQ__original/img/FtecAcFxPelZCfbWhZlo85uF2Rg=/0x0/filters:format(png)/pic6973677.png",
    selected: true,
  },
  {
    id: "140603",
    name: "Francis Drake",
    image:
      "https://cf.geekdo-images.com/oYDRG315rTkMJG9ZFwQpTQ__thumb/img/lAgPi8DttoNwVvdGNkJx4ywyRB4=/fit-in/200x150/filters:strip_icc()/pic3182129.jpg",
    fullSize:
      "https://cf.geekdo-images.com/oYDRG315rTkMJG9ZFwQpTQ__original/img/Cn19RxMSKMquYu2XCdHb4uUyl9Y=/0x0/filters:format(jpeg)/pic3182129.jpg",
    selected: true,
  },
  {
    id: "34635",
    name: "Stone Age",
    image:
      "https://cf.geekdo-images.com/elmZegVZ6gp4_5izUgxGQQ__thumb/img/MXq3DEKWIozO-PmB4S64BiE5fd0=/fit-in/200x150/filters:strip_icc()/pic1632539.jpg",
    fullSize:
      "https://cf.geekdo-images.com/elmZegVZ6gp4_5izUgxGQQ__original/img/cR92Dm6yQ3Lgxt1yR81zUb0ooqQ=/0x0/filters:format(jpeg)/pic1632539.jpg",
    selected: true,
  },
  {
    id: "291453",
    name: "Scout!",
    image:
      "https://cf.geekdo-images.com/ZgmpNS-HrHbdQ736_oeuWg__thumb/img/kSACGLkDHDiXkZssPqFGwUxUimI=/fit-in/200x150/filters:strip_icc()/pic5376324.jpg",
    fullSize:
      "https://cf.geekdo-images.com/ZgmpNS-HrHbdQ736_oeuWg__original/img/Lazrwx14G7dUjJC-FJhFaznx66k=/0x0/filters:format(jpeg)/pic5376324.jpg",
    selected: true,
  },
  {
    id: "171908",
    name: "El Grande Big Box",
    image:
      "https://cf.geekdo-images.com/dTREkApZZA0e46TYFmVgIA__thumb/img/abTJAmQCzAMIrwzBcXtd4gPMQmY=/fit-in/200x150/filters:strip_icc()/pic2748424.jpg",
    fullSize:
      "https://cf.geekdo-images.com/dTREkApZZA0e46TYFmVgIA__original/img/QWCi5b5HBizPfVYrIHo_IU8wKT8=/0x0/filters:format(jpeg)/pic2748424.jpg",
    selected: true,
  },
  {
    id: "155624",
    name: "Specter Ops",
    image:
      "https://cf.geekdo-images.com/lVFArtZrwFEDo23sDcSMEg__thumb/img/pky3rb47HJv8jcNPjV3jbDB7o4c=/fit-in/200x150/filters:strip_icc()/pic2486481.jpg",
    fullSize:
      "https://cf.geekdo-images.com/lVFArtZrwFEDo23sDcSMEg__original/img/HBIgIDOUXTLThknCM1PJsEtvJi8=/0x0/filters:format(jpeg)/pic2486481.jpg",
    selected: true,
  },
  {
    id: "346703",
    name: "7 Wonders: Architects",
    image:
      "https://cf.geekdo-images.com/BGtYtHbLgYhYyNMoyOm1RA__thumb/img/Qml2TbcN2IyaA-PtHKcIrhnELd4=/fit-in/200x150/filters:strip_icc()/pic7416525.jpg",
    fullSize:
      "https://cf.geekdo-images.com/BGtYtHbLgYhYyNMoyOm1RA__original/img/05P7xaW8B4ueCvItryBjO5wVA5s=/0x0/filters:format(jpeg)/pic7416525.jpg",
    selected: true,
  },
  {
    id: "364994",
    name: "Tidal Blades: Banner Festival",
    image:
      "https://cf.geekdo-images.com/UEH2fN9xIOUOpHzpGrdzbw__thumb/img/4x3qQhuZkhD4UzmfJ3qbERzpUCw=/fit-in/200x150/filters:strip_icc()/pic6936303.jpg",
    fullSize:
      "https://cf.geekdo-images.com/UEH2fN9xIOUOpHzpGrdzbw__original/img/XypDTVttIjZNi50oAJVsVMzLdSw=/0x0/filters:format(jpeg)/pic6936303.jpg",
    selected: true,
  },
  {
    id: "15512",
    name: "Diamant",
    image:
      "https://cf.geekdo-images.com/J3FMHPfjJ7vsJIizuOd_Rg__thumb/img/kzIvXkfHmMB2Q_7bniy6rPFebTk=/fit-in/200x150/filters:strip_icc()/pic3414666.jpg",
    fullSize:
      "https://cf.geekdo-images.com/J3FMHPfjJ7vsJIizuOd_Rg__original/img/WWCt75rPY0Hl8GvYANSTWDF35rw=/0x0/filters:format(jpeg)/pic3414666.jpg",
    selected: true,
  },
  {
    id: "110277",
    name: "Among the Stars",
    image:
      "https://cf.geekdo-images.com/xM5-XAyoh7NwuVoguwgEsQ__thumb/img/0Qo56PUZiko4GpS2hZ5R8q-z5VA=/fit-in/200x150/filters:strip_icc()/pic2037906.jpg",
    fullSize:
      "https://cf.geekdo-images.com/xM5-XAyoh7NwuVoguwgEsQ__original/img/JJ3gcJBHOc0-ca-Hq73wYvZRZxk=/0x0/filters:format(jpeg)/pic2037906.jpg",
    selected: true,
  },
  {
    id: "302723",
    name: "Forgotten Waters",
    image:
      "https://cf.geekdo-images.com/gLnzfyJio2MYbG9J-uQSiQ__thumb/img/Th5Wf0ynMEA14i06HUSqzz-8g24=/fit-in/200x150/filters:strip_icc()/pic5253984.jpg",
    fullSize:
      "https://cf.geekdo-images.com/gLnzfyJio2MYbG9J-uQSiQ__original/img/WIqdfw845duHlpr9d5QvzPuHpGI=/0x0/filters:format(jpeg)/pic5253984.jpg",
    selected: true,
  },
  {
    id: "98778",
    name: "Hanabi Deluxe",
    image:
      "https://cf.geekdo-images.com/PV9JxcAU18bjdMYiZ-rjZw__thumb/img/dK2opEE9qrtGclGoYxzYyByczPk=/fit-in/200x150/filters:strip_icc()/pic2270447.jpg",
    fullSize:
      "https://cf.geekdo-images.com/PV9JxcAU18bjdMYiZ-rjZw__original/img/qzyvG0PnXLyTnMI_VIWthDxqprU=/0x0/filters:format(jpeg)/pic2270447.jpg",
    selected: true,
  },
  {
    id: "54",
    name: "Tikal",
    image:
      "https://cf.geekdo-images.com/Da9k3Ari5o1gkapnc9e-AA__thumb/img/-TiL3XbZMRvfi2Vmm2dzMAyJi3w=/fit-in/200x150/filters:strip_icc()/pic518311.jpg",
    fullSize:
      "https://cf.geekdo-images.com/Da9k3Ari5o1gkapnc9e-AA__original/img/LxKTNsZTeAfuzPqCbx82JnJ_nRM=/0x0/filters:format(jpeg)/pic518311.jpg",
    selected: true,
  },
  {
    id: "128621",
    name: "Viticulture",
    image:
      "https://cf.geekdo-images.com/WrnWFA1Sysm3-nQyBe1sUA__thumb/img/udscIXtuApQ6rFYHjfAM5zMKfFs=/fit-in/200x150/filters:strip_icc()/pic2619743.jpg",
    fullSize:
      "https://cf.geekdo-images.com/WrnWFA1Sysm3-nQyBe1sUA__original/img/cGg9S0AH41VxczdybvFsb81AKWw=/0x0/filters:format(jpeg)/pic2619743.jpg",
    selected: true,
  },
  {
    id: "162082",
    name: "Deus",
    image:
      "https://cf.geekdo-images.com/NOz3xJ-N5ptlq3rP9m5Wug__thumb/img/nQQSc-beglCc9XQwvptEwgm07wU=/fit-in/200x150/filters:strip_icc()/pic2219643.png",
    fullSize:
      "https://cf.geekdo-images.com/NOz3xJ-N5ptlq3rP9m5Wug__original/img/gtzP1OE-ifZdnSHoX1pmVwpF0mY=/0x0/filters:format(png)/pic2219643.png",
    selected: true,
  },
  {
    id: "210295",
    name: "Lightseekers",
    image:
      "https://cf.geekdo-images.com/s06wnpU_kBsowAowKpAeEw__thumb/img/3TYZ44oPZCX1XFZUqa_FGfMfRo8=/fit-in/200x150/filters:strip_icc()/pic7756424.jpg",
    fullSize:
      "https://cf.geekdo-images.com/s06wnpU_kBsowAowKpAeEw__original/img/F9zL6K9JdqIF0KLL9b_CSSDpIRw=/0x0/filters:format(jpeg)/pic7756424.jpg",
    selected: true,
  },
  {
    id: "272666",
    name: "Psychic Pizza Deliverers Go to the Ghost Town",
    image:
      "https://cf.geekdo-images.com/NVxVuR-awU9VzfHtOlqGjA__thumb/img/WY1bNhM3L4HDEXFn6XkLlfKhQWo=/fit-in/200x150/filters:strip_icc()/pic5051009.jpg",
    fullSize:
      "https://cf.geekdo-images.com/NVxVuR-awU9VzfHtOlqGjA__original/img/x3qcFjE21LA7MSS6vQp0dzLVQqU=/0x0/filters:format(jpeg)/pic5051009.jpg",
    selected: true,
  },
  {
    id: "390340",
    name: "Challengers! Beach Cup",
    image:
      "https://cf.geekdo-images.com/QZWrLoOoruqb0YRDQT-jng__thumb/img/jq8k_OtehrDmlr05OPXymlPM27Q=/fit-in/200x150/filters:strip_icc()/pic7683878.png",
    fullSize:
      "https://cf.geekdo-images.com/QZWrLoOoruqb0YRDQT-jng__original/img/q7YTy8sOZVf65mbLwnMYvjm1Iv0=/0x0/filters:format(png)/pic7683878.png",
    selected: true,
  },
  {
    id: "201921",
    name: "Tiny Epic Quest",
    image:
      "https://cf.geekdo-images.com/Cd65qIFLnJlkWTfbKDk_FA__thumb/img/RaWuVFlY9wTY4g0d46WMWkZ-E3k=/fit-in/200x150/filters:strip_icc()/pic3120755.jpg",
    fullSize:
      "https://cf.geekdo-images.com/Cd65qIFLnJlkWTfbKDk_FA__original/img/k-346D8FwQe_GUwi40trFGjD7JM=/0x0/filters:format(jpeg)/pic3120755.jpg",
    selected: true,
  },
  {
    id: "245422",
    name: "Werewords Deluxe Edition",
    image:
      "https://cf.geekdo-images.com/77oWoTv9Jrd-haIPL_SwwA__thumb/img/uSPzvF4DktolqeFY-HYVdaGMqz0=/fit-in/200x150/filters:strip_icc()/pic3966906.jpg",
    fullSize:
      "https://cf.geekdo-images.com/77oWoTv9Jrd-haIPL_SwwA__original/img/zbdeVtSQSRwoPcIX4t8vNjFXm4I=/0x0/filters:format(jpeg)/pic3966906.jpg",
    selected: true,
  },
  {
    id: "117915",
    name: "Yedo",
    image:
      "https://cf.geekdo-images.com/jdBgNHtZ5TXAq4jXvN7XyQ__thumb/img/drUkVG97U1ZmcAreejXCXVw3Lq8=/fit-in/200x150/filters:strip_icc()/pic1633240.jpg",
    fullSize:
      "https://cf.geekdo-images.com/jdBgNHtZ5TXAq4jXvN7XyQ__original/img/tUiwp3vNcvSrf7SzmZZq557YjRc=/0x0/filters:format(jpeg)/pic1633240.jpg",
    selected: true,
  },
  {
    id: "158435",
    name: "Dogs of War",
    image:
      "https://cf.geekdo-images.com/pN_2LoK9ICB6TD5h3QSPAQ__thumb/img/5T3HgkcVHmIDMXEgEi42T_ZyJLg=/fit-in/200x150/filters:strip_icc()/pic2682914.jpg",
    fullSize:
      "https://cf.geekdo-images.com/pN_2LoK9ICB6TD5h3QSPAQ__original/img/YC74jSe7Q6VSdSVxcBhdCKtqhwo=/0x0/filters:format(jpeg)/pic2682914.jpg",
    selected: true,
  },
  {
    id: "244521",
    name: "The Quacks of Quedlinburg",
    image:
      "https://cf.geekdo-images.com/pH5LgRL4mNRon-2NsSDb1Q__thumb/img/E_XspsgbgrVOwOeCuZMO1S8W2rk=/fit-in/200x150/filters:strip_icc()/pic6137509.png",
    fullSize:
      "https://cf.geekdo-images.com/pH5LgRL4mNRon-2NsSDb1Q__original/img/8PEJOyuKGbTaEGbUbCoLQy_i65Y=/0x0/filters:format(png)/pic6137509.png",
    selected: true,
  },
  {
    id: "189453",
    name: "Victorian Masterminds",
    image:
      "https://cf.geekdo-images.com/K68z07I9sYp-05RicU0iSA__thumb/img/y24kuqGGjz9l7SxWMQjhTVCHUrE=/fit-in/200x150/filters:strip_icc()/pic4526338.jpg",
    fullSize:
      "https://cf.geekdo-images.com/K68z07I9sYp-05RicU0iSA__original/img/Ypy5VeLQHRsIbqlw8oPd4uAcOz0=/0x0/filters:format(jpeg)/pic4526338.jpg",
    selected: true,
  },
  {
    id: "31999",
    name: "TZAAR",
    image:
      "https://cf.geekdo-images.com/83RmBw8qTkDJo7qC-YY8og__thumb/img/E1zUB2Jka041LV1zypcMCZAh6eU=/fit-in/200x150/filters:strip_icc()/pic3607816.jpg",
    fullSize:
      "https://cf.geekdo-images.com/83RmBw8qTkDJo7qC-YY8og__original/img/b5t4-4APxLqV0PeOSa6FGib-OL8=/0x0/filters:format(jpeg)/pic3607816.jpg",
    selected: true,
  },
  {
    id: "175549",
    name: "Salem",
    image:
      "https://cf.geekdo-images.com/XMFd0q2Y0EyHQtH68o-RZA__thumb/img/s_Dyvot8aSLRZ7WqQr5TQnA7bO4=/fit-in/200x150/filters:strip_icc()/pic4020023.jpg",
    fullSize:
      "https://cf.geekdo-images.com/XMFd0q2Y0EyHQtH68o-RZA__original/img/WSmUo6jYFj27RsesRhoV7TnRW_E=/0x0/filters:format(jpeg)/pic4020023.jpg",
    selected: true,
  },
  {
    id: "41",
    name: "キャント・ストップ",
    image:
      "https://cf.geekdo-images.com/uEa12C5_OSLAD2j00S6Cuw__thumb/img/R1hH3tsdNfBzajKnMMEbOM_C5iM=/fit-in/200x150/filters:strip_icc()/pic3306707.jpg",
    fullSize:
      "https://cf.geekdo-images.com/uEa12C5_OSLAD2j00S6Cuw__original/img/hkB8R0EfCawld46n6pAiXsv-bEI=/0x0/filters:format(jpeg)/pic3306707.jpg",
    selected: true,
  },
  {
    id: "294514",
    name: "5-Minute Mystery",
    image:
      "https://cf.geekdo-images.com/227j91odzi4v2S2pbxcscg__thumb/img/WnOChlK7te8FoCGy-yDGDCAacOo=/fit-in/200x150/filters:strip_icc()/pic7486281.jpg",
    fullSize:
      "https://cf.geekdo-images.com/227j91odzi4v2S2pbxcscg__original/img/OJ-arew7SLsyDboqb7J9p6--cB0=/0x0/filters:format(jpeg)/pic7486281.jpg",
    selected: true,
  },
  {
    id: "373106",
    name: "Sky Team",
    image:
      "https://cf.geekdo-images.com/uXMeQzNenHb3zK7Hoa6b2w__thumb/img/WyPClajMWU9lV5BdCXiZnqdZgmU=/fit-in/200x150/filters:strip_icc()/pic7398904.jpg",
    fullSize:
      "https://cf.geekdo-images.com/uXMeQzNenHb3zK7Hoa6b2w__original/img/mWOQnkpyYBorh_Y1-0Y2o-ew17k=/0x0/filters:format(jpeg)/pic7398904.jpg",
    selected: true,
  },
  {
    id: "329845",
    name: "Stella: Dixit Universe",
    image:
      "https://cf.geekdo-images.com/j3vn68o2ovUim3zh-JiWIA__thumb/img/J-AoVapdE_5tkdmPRe39ltN0FwU=/fit-in/200x150/filters:strip_icc()/pic6738101.jpg",
    fullSize:
      "https://cf.geekdo-images.com/j3vn68o2ovUim3zh-JiWIA__original/img/hQyaMSdfLsbyghE-mZ6T5HI3M_s=/0x0/filters:format(jpeg)/pic6738101.jpg",
    selected: true,
  },
  {
    id: "229220",
    name: "Santa Maria",
    image:
      "https://cf.geekdo-images.com/bpwAMn7t9LnBQKFJw6VNPg__thumb/img/S-tPq43ITn88ppHjIbi8eaIbOX8=/fit-in/200x150/filters:strip_icc()/pic3882016.jpg",
    fullSize:
      "https://cf.geekdo-images.com/bpwAMn7t9LnBQKFJw6VNPg__original/img/6tMXw9izC_uv_AJLOLztsqNPW3o=/0x0/filters:format(jpeg)/pic3882016.jpg",
    selected: true,
  },
  {
    id: "344258",
    name: "That Time You Killed Me",
    image:
      "https://cf.geekdo-images.com/tcupSjoLMn9sKbnGxQU9Kg__thumb/img/aQGuKmGqMS8WWfWA280XJJ2jiI4=/fit-in/200x150/filters:strip_icc()/pic6326925.jpg",
    fullSize:
      "https://cf.geekdo-images.com/tcupSjoLMn9sKbnGxQU9Kg__original/img/1y5pSKExuTjPExQzWf99e_xbwPM=/0x0/filters:format(jpeg)/pic6326925.jpg",
    selected: true,
  },
  {
    id: "129622",
    name: "Love Letter",
    image:
      "https://cf.geekdo-images.com/T1ltXwapFUtghS9A7_tf4g__thumb/img/GtNX7gCmGpw39Tr6JApWC3Aga5U=/fit-in/200x150/filters:strip_icc()/pic1401448.jpg",
    fullSize:
      "https://cf.geekdo-images.com/T1ltXwapFUtghS9A7_tf4g__original/img/xIAzJY7rl-mtPStRZSqnTVsAr8Y=/0x0/filters:format(jpeg)/pic1401448.jpg",
    selected: true,
  },
  {
    id: "342942",
    name: "Ark Nova",
    image:
      "https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__thumb/img/4KuHNTWSMPf8vTNDKSRMMI3oOv8=/fit-in/200x150/filters:strip_icc()/pic6293412.jpg",
    fullSize:
      "https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__original/img/g4S18szTdrXCdIwVKzMKrZrYAcM=/0x0/filters:format(jpeg)/pic6293412.jpg",
    selected: true,
  },
  {
    id: "314491",
    name: "Meadow",
    image:
      "https://cf.geekdo-images.com/9r3qdPijtgoIN24PxFU2gw__thumb/img/tugW5aKyC6Vs31QaBX8YvmQiPTQ=/fit-in/200x150/filters:strip_icc()/pic5894745.jpg",
    fullSize:
      "https://cf.geekdo-images.com/9r3qdPijtgoIN24PxFU2gw__original/img/tHQTKwwk4N8J5fpWhsoE8t0FQhw=/0x0/filters:format(jpeg)/pic5894745.jpg",
    selected: true,
  },
  {
    id: "22348",
    name: "Identik",
    image:
      "https://cf.geekdo-images.com/WLtdgkh6P0DMk1TFjZp3yQ__thumb/img/4sUyOhM7MjzkU3lYddvEfmjF9lA=/fit-in/200x150/filters:strip_icc()/pic763533.jpg",
    fullSize:
      "https://cf.geekdo-images.com/WLtdgkh6P0DMk1TFjZp3yQ__original/img/_q2saqyR_kJRGWzvhdguZ6Aaufk=/0x0/filters:format(jpeg)/pic763533.jpg",
    selected: true,
  },
  {
    id: "121410",
    name: "Steam Park",
    image:
      "https://cf.geekdo-images.com/HA0kPnNDm7O0gh0ukPcGcw__thumb/img/zZNZq4mvxP9y-MxZQyeHvFsDhdk=/fit-in/200x150/filters:strip_icc()/pic2656302.jpg",
    fullSize:
      "https://cf.geekdo-images.com/HA0kPnNDm7O0gh0ukPcGcw__original/img/o98tRHk91X2oFIsYeyXvrJJixss=/0x0/filters:format(jpeg)/pic2656302.jpg",
    selected: true,
  },
  {
    id: "161614",
    name: "Stockpile",
    image:
      "https://cf.geekdo-images.com/T7CvF_oFrEMNgS0Eyrbr5g__thumb/img/8ebaZ-3iSTwY0mvlc8FFULp8B4k=/fit-in/200x150/filters:strip_icc()/pic2537618.jpg",
    fullSize:
      "https://cf.geekdo-images.com/T7CvF_oFrEMNgS0Eyrbr5g__original/img/lJ0jHrlXH3mdtjM56LGUSmArmeQ=/0x0/filters:format(jpeg)/pic2537618.jpg",
    selected: true,
  },
  {
    id: "295947",
    name: "Cascadia",
    image:
      "https://cf.geekdo-images.com/MjeJZfulbsM1DSV3DrGJYA__thumb/img/tVSFjSxYEcw7sKj3unIIQV8kxoc=/fit-in/200x150/filters:strip_icc()/pic5100691.jpg",
    fullSize:
      "https://cf.geekdo-images.com/MjeJZfulbsM1DSV3DrGJYA__original/img/B374C04Eip7fmQBGJzgiOTp-jyQ=/0x0/filters:format(jpeg)/pic5100691.jpg",
    selected: true,
  },
]);
const TEMPORARY_SORTED_JSON = [
  {
    id: "355997",
    name: "Thunder Road: Vendetta – Maximum Chrome",
    image:
      "https://cf.geekdo-images.com/obb3d9EAeHz69CQSIzLu8A__thumb/img/D4gOwBUZDiAHUAKBswyt80YartU=/fit-in/200x150/filters:strip_icc()/pic6657894.png",
    fullSize:
      "https://cf.geekdo-images.com/obb3d9EAeHz69CQSIzLu8A__original/img/kdFeOvpUU-LHv8iH8BDj_g7z5UM=/0x0/filters:format(png)/pic6657894.png",
    selected: true,
  },
  [
    {
      id: "43528",
      name: "World Without End",
      image:
        "https://cf.geekdo-images.com/r0wz1yAtjaU5e-u_hKIYeQ__thumb/img/0PprBIyZlwF0Eh4TJ2X-yrUG4og=/fit-in/200x150/filters:strip_icc()/pic583088.jpg",
      fullSize:
        "https://cf.geekdo-images.com/r0wz1yAtjaU5e-u_hKIYeQ__original/img/_fgqHsg7p8xrGwC_MB70fWcGpPw=/0x0/filters:format(jpeg)/pic583088.jpg",
      selected: true,
    },
    {
      id: "36648",
      name: "Pyramid of Pengqueen",
      image:
        "https://cf.geekdo-images.com/JTVC6koRzua2Vh0v-HTPmQ__thumb/img/1KJTQuGAfiFBCyxAXU0f0swqZHo=/fit-in/200x150/filters:strip_icc()/pic4090859.png",
      fullSize:
        "https://cf.geekdo-images.com/JTVC6koRzua2Vh0v-HTPmQ__original/img/oTBgoXlTLMQYXdVwnm6x49Cv5VI=/0x0/filters:format(png)/pic4090859.png",
      selected: true,
    },
    {
      id: "171131",
      name: "Captain Sonar",
      image:
        "https://cf.geekdo-images.com/eVy9IyAVtzzKv2VvPHFPbA__thumb/img/RavsPCF6el7VEaVR1OG5M2ZGCrk=/fit-in/200x150/filters:strip_icc()/pic3013621.png",
      fullSize:
        "https://cf.geekdo-images.com/eVy9IyAVtzzKv2VvPHFPbA__original/img/vSfK0lGYI45DIcyrOkTPYzI412M=/0x0/filters:format(png)/pic3013621.png",
      selected: true,
    },
    {
      id: "283393",
      name: "Aquatica",
      image:
        "https://cf.geekdo-images.com/_8WvjlAU1_Y0qhwTjXvbnA__thumb/img/8zjeyk9juPqsHIwuPt7wiZFia-M=/fit-in/200x150/filters:strip_icc()/pic5578646.jpg",
      fullSize:
        "https://cf.geekdo-images.com/_8WvjlAU1_Y0qhwTjXvbnA__original/img/q01FWyijYaqvGhuwz-lkPBoxaRo=/0x0/filters:format(jpeg)/pic5578646.jpg",
      selected: true,
    },
    {
      id: "298047",
      name: "Marvel United",
      image:
        "https://cf.geekdo-images.com/-19XPXmTn9QyyvqwpcFkBw__thumb/img/T3jn8ks3g0zLyISTRQkIr0D1WSE=/fit-in/200x150/filters:strip_icc()/pic5231006.jpg",
      fullSize:
        "https://cf.geekdo-images.com/-19XPXmTn9QyyvqwpcFkBw__original/img/zgZcNusSm7mFMP3N6MJvJRe_gKY=/0x0/filters:format(jpeg)/pic5231006.jpg",
      selected: true,
    },
    {
      id: "31481",
      name: "Galaxy Trucker",
      image:
        "https://cf.geekdo-images.com/gLFt1Kif5Cfag505_COYYw__thumb/img/WOW_QsRuV1KyP8dLjP0yH6TlpvU=/fit-in/200x150/filters:strip_icc()/pic3926631.jpg",
      fullSize:
        "https://cf.geekdo-images.com/gLFt1Kif5Cfag505_COYYw__original/img/5vUNCkVDoQpcTfmlhFzkS4e1EaQ=/0x0/filters:format(jpeg)/pic3926631.jpg",
      selected: true,
    },
    {
      id: "307305",
      name: "Bullet♥︎",
      image:
        "https://cf.geekdo-images.com/315gnIdET7dlQ_fASt8p0w__thumb/img/ZUVCes8DtY3pYnUJ3zghUkhT3fQ=/fit-in/200x150/filters:strip_icc()/pic6007944.jpg",
      fullSize:
        "https://cf.geekdo-images.com/315gnIdET7dlQ_fASt8p0w__original/img/X2MDGNIMouqDtC6617rzlxW5LDw=/0x0/filters:format(jpeg)/pic6007944.jpg",
      selected: true,
    },
    {
      id: "39463",
      name: "Cosmic Encounter",
      image:
        "https://cf.geekdo-images.com/S8cE-Ld7XP5sVz-upKJ-Bg__thumb/img/gE--xqnuor4bft2J361zxJJGCjM=/fit-in/200x150/filters:strip_icc()/pic1521633.jpg",
      fullSize:
        "https://cf.geekdo-images.com/S8cE-Ld7XP5sVz-upKJ-Bg__original/img/c4ZrfOtpp6tDHLyMsKecc2ne370=/0x0/filters:format(jpeg)/pic1521633.jpg",
      selected: true,
    },
    {
      id: "273477",
      name: "Obscurio",
      image:
        "https://cf.geekdo-images.com/gSBn3vnTQ6Hh6JmxA38N7g__thumb/img/oYWbj-zNavmDg7fS22uOp6NKnnY=/fit-in/200x150/filters:strip_icc()/pic4611791.jpg",
      fullSize:
        "https://cf.geekdo-images.com/gSBn3vnTQ6Hh6JmxA38N7g__original/img/hZUqpAVXnuStIYiL7Poqy-7JLXw=/0x0/filters:format(jpeg)/pic4611791.jpg",
      selected: true,
    },
    {
      id: "228341",
      name: "Pulsar 2849",
      image:
        "https://cf.geekdo-images.com/NSF3OBldDuQIfLIav_eL9Q__thumb/img/vdTdCpJPHw6UM3_MTiwr8YkEliU=/fit-in/200x150/filters:strip_icc()/pic3736981.jpg",
      fullSize:
        "https://cf.geekdo-images.com/NSF3OBldDuQIfLIav_eL9Q__original/img/yLf-CMVeWa7bxFeoWAIEOSFUcgo=/0x0/filters:format(jpeg)/pic3736981.jpg",
      selected: true,
    },
    {
      id: "171623",
      name: "The Voyages of Marco Polo",
      image:
        "https://cf.geekdo-images.com/n1G7_aWToLAAB7Mqt8iwyA__thumb/img/qfEgrXBN5L1EeMQ91siw6r_OoL4=/fit-in/200x150/filters:strip_icc()/pic2461346.png",
      fullSize:
        "https://cf.geekdo-images.com/n1G7_aWToLAAB7Mqt8iwyA__original/img/VQddnfi_QO0r4GmUU3M8_-nuO3Q=/0x0/filters:format(png)/pic2461346.png",
      selected: true,
    },
    {
      id: "27162",
      name: "Kingsburg",
      image:
        "https://cf.geekdo-images.com/J28gmIhq9yvQ6tcGdW7oDg__thumb/img/86Sg3ZAdtXiTnOB65mM9jm-sFjg=/fit-in/200x150/filters:strip_icc()/pic718251.jpg",
      fullSize:
        "https://cf.geekdo-images.com/J28gmIhq9yvQ6tcGdW7oDg__original/img/cwCEvhwK3rKnER7mSqFFgOfZbXg=/0x0/filters:format(jpeg)/pic718251.jpg",
      selected: true,
    },
    {
      id: "187988",
      name: "Pyramid Arcade",
      image:
        "https://cf.geekdo-images.com/htyLkaiB_ozg2NddpbsC6w__thumb/img/Pc1qKVVsdGxq2GHJ1XuFWnHm0UY=/fit-in/200x150/filters:strip_icc()/pic2746707.png",
      fullSize:
        "https://cf.geekdo-images.com/htyLkaiB_ozg2NddpbsC6w__original/img/8jEyiZg5nwW_n2xe4FIPgakhLUo=/0x0/filters:format(png)/pic2746707.png",
      selected: true,
    },
    {
      id: "224517",
      name: "Brass: Birmingham",
      image:
        "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__thumb/img/o18rjEemoWaVru9Y2TyPwuIaRfE=/fit-in/200x150/filters:strip_icc()/pic3490053.jpg",
      fullSize:
        "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__original/img/FpyxH41Y6_ROoePAilPNEhXnzO8=/0x0/filters:format(jpeg)/pic3490053.jpg",
      selected: true,
    },
    {
      id: "8668",
      name: "Igloo Pop",
      image:
        "https://cf.geekdo-images.com/Af5zkHNx-xTGtVlh320MYQ__thumb/img/1YIuXI5UmnNh4jO6auK-XjjlnnE=/fit-in/200x150/filters:strip_icc()/pic36174.jpg",
      fullSize:
        "https://cf.geekdo-images.com/Af5zkHNx-xTGtVlh320MYQ__original/img/1_zxry_KyKFOkT3ZRFVvq3x0AIA=/0x0/filters:format(jpeg)/pic36174.jpg",
      selected: true,
    },
    {
      id: "365258",
      name: "World Wonders",
      image:
        "https://cf.geekdo-images.com/GGi5aUL1dVQIrytxgXow4g__thumb/img/90wLgUROk-IetKyXz2Fa7zNBCVs=/fit-in/200x150/filters:strip_icc()/pic7604558.png",
      fullSize:
        "https://cf.geekdo-images.com/GGi5aUL1dVQIrytxgXow4g__original/img/ZpVBZXZhs1plAi5s4M7Db3YwBLc=/0x0/filters:format(png)/pic7604558.png",
      selected: true,
    },
    {
      id: "157354",
      name: "Five Tribes: The Djinns of Naqala",
      image:
        "https://cf.geekdo-images.com/dmo-WD6HZHVUPrbVHunaTw__thumb/img/I6KVJlQgS1GfWDPSWAFNqce4Cgc=/fit-in/200x150/filters:strip_icc()/pic2055255.jpg",
      fullSize:
        "https://cf.geekdo-images.com/dmo-WD6HZHVUPrbVHunaTw__original/img/PS9HXrThM8Pepbd-cuA1tX8KCYU=/0x0/filters:format(jpeg)/pic2055255.jpg",
      selected: true,
    },
    {
      id: "244916",
      name: "Drop It",
      image:
        "https://cf.geekdo-images.com/kkF3MJrPU-byzAlFbxGYew__thumb/img/y0YSRjiGXFEawazsYFmVVoD3Q94=/fit-in/200x150/filters:strip_icc()/pic3958813.jpg",
      fullSize:
        "https://cf.geekdo-images.com/kkF3MJrPU-byzAlFbxGYew__original/img/UI0eMd3BQuPDZDEACi8n84GdcQE=/0x0/filters:format(jpeg)/pic3958813.jpg",
      selected: true,
    },
    {
      id: "245638",
      name: "Coimbra",
      image:
        "https://cf.geekdo-images.com/JJFHx0RiUBYdy9bHAgVSuA__thumb/img/-eaAIbixYxRRVj0tDTS1oP_9Njk=/fit-in/200x150/filters:strip_icc()/pic3956079.jpg",
      fullSize:
        "https://cf.geekdo-images.com/JJFHx0RiUBYdy9bHAgVSuA__original/img/zwcZQov_aUfBN0z9J9PzsJqomeI=/0x0/filters:format(jpeg)/pic3956079.jpg",
      selected: true,
    },
    {
      id: "164265",
      name: "Witness",
      image:
        "https://cf.geekdo-images.com/E-432DX7M9-UJpFO88uJ6w__thumb/img/5FX8yNyKO898-jHjxI5JviBHTpE=/fit-in/200x150/filters:strip_icc()/pic2336025.jpg",
      fullSize:
        "https://cf.geekdo-images.com/E-432DX7M9-UJpFO88uJ6w__original/img/1EbX-Sm44IJZ1XUXqVOs4mjndpo=/0x0/filters:format(jpeg)/pic2336025.jpg",
      selected: true,
    },
    {
      id: "1042",
      name: "Dragon&#039;s Gold",
      image:
        "https://cf.geekdo-images.com/WLB1QxDgV44HW3FMyUWrpA__thumb/img/oUL9m0kSCUXAo_tQcTFGzOLL4zk=/fit-in/200x150/filters:strip_icc()/pic1904902.jpg",
      fullSize:
        "https://cf.geekdo-images.com/WLB1QxDgV44HW3FMyUWrpA__original/img/FbbLipSEY-VgM1g3Ffua8jebnuI=/0x0/filters:format(jpeg)/pic1904902.jpg",
      selected: true,
    },
    {
      id: "6830",
      name: "Zendo",
      image:
        "https://cf.geekdo-images.com/F5gufc6NTi_MZ1rcPsRvtQ__thumb/img/5ZIKwf8QqCdxXRbZW5YKObXKtNc=/fit-in/200x150/filters:strip_icc()/pic3808891.jpg",
      fullSize:
        "https://cf.geekdo-images.com/F5gufc6NTi_MZ1rcPsRvtQ__original/img/TbQdW305j2rqYumYhNzrmvI3XQ4=/0x0/filters:format(jpeg)/pic3808891.jpg",
      selected: true,
    },
    {
      id: "248490",
      name: "Atlantis Rising (Second Edition)",
      image:
        "https://cf.geekdo-images.com/WRHngbJkWiKAJ4U8xSySIQ__thumb/img/kZ9kSXPe8naMaTtc9IV4SFOBCcw=/fit-in/200x150/filters:strip_icc()/pic4895878.jpg",
      fullSize:
        "https://cf.geekdo-images.com/WRHngbJkWiKAJ4U8xSySIQ__original/img/TXo07OaiWGK59Zu0IBXbnBpbmag=/0x0/filters:format(jpeg)/pic4895878.jpg",
      selected: true,
    },
    {
      id: "258309",
      name: "First Contact",
      image:
        "https://cf.geekdo-images.com/6XFaGyeG_ZrvO7lna8kDQA__thumb/img/S8yL6oyGY5EnFMwZfcxN3tto9L8=/fit-in/200x150/filters:strip_icc()/pic4419988.jpg",
      fullSize:
        "https://cf.geekdo-images.com/6XFaGyeG_ZrvO7lna8kDQA__original/img/z1DgjKhNsUMeX0I45RYPx20a-bQ=/0x0/filters:format(jpeg)/pic4419988.jpg",
      selected: true,
    },
    {
      id: "242639",
      name: "Treasure Island",
      image:
        "https://cf.geekdo-images.com/tHEYd09coOFilcJZf3-I9A__thumb/img/DIbtdKy0v43ncP_fBcBZoIPQ2cs=/fit-in/200x150/filters:strip_icc()/pic6974459.jpg",
      fullSize:
        "https://cf.geekdo-images.com/tHEYd09coOFilcJZf3-I9A__original/img/dsvADohNa_xOOW6-9A-YhfFsKq0=/0x0/filters:format(jpeg)/pic6974459.jpg",
      selected: true,
    },
    {
      id: "390092",
      name: "Ticket to Ride Legacy: Legends of the West",
      image:
        "https://cf.geekdo-images.com/2H0pJddVJA3r6btqRNLG1g__thumb/img/scMQ04r1admTpyvH91g9DbZEncg=/fit-in/200x150/filters:strip_icc()/pic7541330.png",
      fullSize:
        "https://cf.geekdo-images.com/2H0pJddVJA3r6btqRNLG1g__original/img/q8N6sz7FIZkbXe_0d4RiIfM8aNU=/0x0/filters:format(png)/pic7541330.png",
      selected: true,
    },
    {
      id: "368432",
      name: "The Fox Experiment",
      image:
        "https://cf.geekdo-images.com/wzvBp42eSal9UrL2EgOjyw__thumb/img/EVGDAoyPls95_nGayGjGLChQ0GM=/fit-in/200x150/filters:strip_icc()/pic7557488.png",
      fullSize:
        "https://cf.geekdo-images.com/wzvBp42eSal9UrL2EgOjyw__original/img/m59dyylOOw0FrwEWxzCp7g4_Xp8=/0x0/filters:format(png)/pic7557488.png",
      selected: true,
    },
    {
      id: "95527",
      name: "Madeira",
      image:
        "https://cf.geekdo-images.com/wY6k5MmdPH3NVXsJ-SgtMw__thumb/img/Su3JBW4OIe8Qt6nXEyUcMOJtqsM=/fit-in/200x150/filters:strip_icc()/pic1762708.jpg",
      fullSize:
        "https://cf.geekdo-images.com/wY6k5MmdPH3NVXsJ-SgtMw__original/img/I-0fr4331yRjHcjZlXiSzq0Lbnw=/0x0/filters:format(jpeg)/pic1762708.jpg",
      selected: true,
    },
    {
      id: "378356",
      name: "The A.R.T. Project",
      image:
        "https://cf.geekdo-images.com/71s14D-JgU8uaVrh_a1fUw__thumb/img/brSpeylY0jSn30eYX6ufWkmwxV8=/fit-in/200x150/filters:strip_icc()/pic7705860.jpg",
      fullSize:
        "https://cf.geekdo-images.com/71s14D-JgU8uaVrh_a1fUw__original/img/KLy6d7-nBlusZ-39J3nhZ9f8VOw=/0x0/filters:format(jpeg)/pic7705860.jpg",
      selected: true,
    },
    {
      id: "274093",
      name: "Quirky Circuits",
      image:
        "https://cf.geekdo-images.com/aNabLAdJAW0ot6hojnC9rw__thumb/img/TV8pBvFqB-Y1rPL91CHISW1hgFo=/fit-in/200x150/filters:strip_icc()/pic4602889.jpg",
      fullSize:
        "https://cf.geekdo-images.com/aNabLAdJAW0ot6hojnC9rw__original/img/9qCVfCkEhrTXcKOS_u3HJPO7KJo=/0x0/filters:format(jpeg)/pic4602889.jpg",
      selected: true,
    },
    {
      id: "205597",
      name: "Jump Drive",
      image:
        "https://cf.geekdo-images.com/vidEoAQGKIucMiHEwVE-tQ__thumb/img/tuaYCNt7vesWf83MSn7_Dwa64m4=/fit-in/200x150/filters:strip_icc()/pic3121227.jpg",
      fullSize:
        "https://cf.geekdo-images.com/vidEoAQGKIucMiHEwVE-tQ__original/img/c8_pAZOeAxfE6vOoUTUYy3G-z5Y=/0x0/filters:format(jpeg)/pic3121227.jpg",
      selected: true,
    },
    {
      id: "132372",
      name: "Guildhall: Zünfte &amp; Intrigen",
      image:
        "https://cf.geekdo-images.com/SC6L40I2LX8nPBK5dP4T6g__thumb/img/qnzGcROzfX7bKC2j5GFjg5LQ8-c=/fit-in/200x150/filters:strip_icc()/pic1684114.jpg",
      fullSize:
        "https://cf.geekdo-images.com/SC6L40I2LX8nPBK5dP4T6g__original/img/KccY19Dgysf9-mfKvCRvVDTIJbk=/0x0/filters:format(jpeg)/pic1684114.jpg",
      selected: true,
    },
    {
      id: "127023",
      name: "Kemet",
      image:
        "https://cf.geekdo-images.com/RmZjhy7_6REp8IaXh9Zqwg__thumb/img/930_NppLsnIGUDG_W6wkdOGgKR8=/fit-in/200x150/filters:strip_icc()/pic3979527.jpg",
      fullSize:
        "https://cf.geekdo-images.com/RmZjhy7_6REp8IaXh9Zqwg__original/img/kRFfkVnQRsBDcbO46TKS6PcT6aE=/0x0/filters:format(jpeg)/pic3979527.jpg",
      selected: true,
    },
    {
      id: "244191",
      name: "Naga Raja",
      image:
        "https://cf.geekdo-images.com/BhWG7lpcdeDtgREf_qoxnw__thumb/img/A05JkFIHJGHpkTvNu2jgNxFx5M0=/fit-in/200x150/filters:strip_icc()/pic4584504.jpg",
      fullSize:
        "https://cf.geekdo-images.com/BhWG7lpcdeDtgREf_qoxnw__original/img/DZPHZKfcCd8722GNo6en6GgCWmk=/0x0/filters:format(jpeg)/pic4584504.jpg",
      selected: true,
    },
    {
      id: "260180",
      name: "Project L",
      image:
        "https://cf.geekdo-images.com/Zwx2ZXS6r6PaxhkaVEe75Q__thumb/img/3x5kSxZlvLK6PdeMHX9xd_sSTMs=/fit-in/200x150/filters:strip_icc()/pic4309147.jpg",
      fullSize:
        "https://cf.geekdo-images.com/Zwx2ZXS6r6PaxhkaVEe75Q__original/img/nBfsV9V5a-xc3uJkYhE0DN-QVjI=/0x0/filters:format(jpeg)/pic4309147.jpg",
      selected: true,
    },
    {
      id: "80006",
      name: "Mord im Arosa",
      image:
        "https://cf.geekdo-images.com/E39zb5Z4tTKI59aYqlu02Q__thumb/img/uCzTevV-BKg48iwxH7alpyChUQk=/fit-in/200x150/filters:strip_icc()/pic4679040.jpg",
      fullSize:
        "https://cf.geekdo-images.com/E39zb5Z4tTKI59aYqlu02Q__original/img/pFgxdpEMqAzZN_QBkV32CPEUskI=/0x0/filters:format(jpeg)/pic4679040.jpg",
      selected: true,
    },
    {
      id: "285967",
      name: "Ankh: Gods of Egypt",
      image:
        "https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__thumb/img/OMVAMJX95HNO-vSRdk-kGjAzzBY=/fit-in/200x150/filters:strip_icc()/pic6107853.jpg",
      fullSize:
        "https://cf.geekdo-images.com/_al0scMG_pQfGVM31Scf1Q__original/img/h4jBTaOjznJgWELa6tTrfPqqSeA=/0x0/filters:format(jpeg)/pic6107853.jpg",
      selected: true,
    },
    {
      id: "315610",
      name: "Massive Darkness 2: Hellscape",
      image:
        "https://cf.geekdo-images.com/e-QmT0KuEc0E4bWNih6EVQ__thumb/img/Q1WD-ufxyF37HxWH5T6t8amKcqk=/fit-in/200x150/filters:strip_icc()/pic6107854.png",
      fullSize:
        "https://cf.geekdo-images.com/e-QmT0KuEc0E4bWNih6EVQ__original/img/alQDRawS3Soxpe-sCU3_WBNUCNk=/0x0/filters:format(png)/pic6107854.png",
      selected: true,
    },
    {
      id: "22141",
      name: "Cleopatra and the Society of Architects",
      image:
        "https://cf.geekdo-images.com/7cNh9n1YX-TjuWPTjYXSiw__thumb/img/XkQLcneMW2QnQslgvjOWTo94Pm8=/fit-in/200x150/filters:strip_icc()/pic1904123.jpg",
      fullSize:
        "https://cf.geekdo-images.com/7cNh9n1YX-TjuWPTjYXSiw__original/img/gbaEwHT_3twIEeYzqH8RDKgiE9Q=/0x0/filters:format(jpeg)/pic1904123.jpg",
      selected: true,
    },
    {
      id: "276830",
      name: "Sanctum",
      image:
        "https://cf.geekdo-images.com/dRudo6DXsbwaUVvT6SBtLQ__thumb/img/Kk95zESrJLavZtvqZSWAJlN0214=/fit-in/200x150/filters:strip_icc()/pic4993715.jpg",
      fullSize:
        "https://cf.geekdo-images.com/dRudo6DXsbwaUVvT6SBtLQ__original/img/dkj2b8hPZ7aZhi7FiY5PvrS2fDE=/0x0/filters:format(jpeg)/pic4993715.jpg",
      selected: true,
    },
    {
      id: "363183",
      name: "Tokaido Duo",
      image:
        "https://cf.geekdo-images.com/juPT5Pk08xW90MhyeXjhZg__thumb/img/HVlqdO3-sNjI5ngEaA-9u10LWzg=/fit-in/200x150/filters:strip_icc()/pic6870090.jpg",
      fullSize:
        "https://cf.geekdo-images.com/juPT5Pk08xW90MhyeXjhZg__original/img/2xDiSlGkeqAfnUkd1eHkTMPVrbM=/0x0/filters:format(jpeg)/pic6870090.jpg",
      selected: true,
    },
    {
      id: "357028",
      name: "Dungeon Fighter: Second Edition",
      image:
        "https://cf.geekdo-images.com/ZuseUrDocxDQC-nXa6mKSA__thumb/img/26YmQhpbrDgCehmPsy_D_awkBnI=/fit-in/200x150/filters:strip_icc()/pic6685018.jpg",
      fullSize:
        "https://cf.geekdo-images.com/ZuseUrDocxDQC-nXa6mKSA__original/img/YnCeOe432RbLe5_aqXvKC2Gal60=/0x0/filters:format(jpeg)/pic6685018.jpg",
      selected: true,
    },
    {
      id: "113294",
      name: "Escape: The Curse of the Temple",
      image:
        "https://cf.geekdo-images.com/m6269wyfWVa7gZp3oXKx6A__thumb/img/WPqYsCIpVURoB_rdqRLgZptWNV8=/fit-in/200x150/filters:strip_icc()/pic3328521.jpg",
      fullSize:
        "https://cf.geekdo-images.com/m6269wyfWVa7gZp3oXKx6A__original/img/ZSDgydHuIZpyrZaVL1F7Lepi3h0=/0x0/filters:format(jpeg)/pic3328521.jpg",
      selected: true,
    },
    {
      id: "163968",
      name: "Elysium",
      image:
        "https://cf.geekdo-images.com/hNyO7u1pR3oSxKTELS7n2w__thumb/img/HWVlTW4WTam1F8UeT6RJeS4olIs=/fit-in/200x150/filters:strip_icc()/pic2837103.png",
      fullSize:
        "https://cf.geekdo-images.com/hNyO7u1pR3oSxKTELS7n2w__original/img/rpASlZTyhc7GMnGiMwk1i4AC-PY=/0x0/filters:format(png)/pic2837103.png",
      selected: true,
    },
    {
      id: "22245",
      name: "Royal Visit",
      image:
        "https://cf.geekdo-images.com/x4s694EfCpt7MtxAwzRDuQ__thumb/img/YeqqzGqiMeAWOGNZlWUv607i9ZY=/fit-in/200x150/filters:strip_icc()/pic5854330.jpg",
      fullSize:
        "https://cf.geekdo-images.com/x4s694EfCpt7MtxAwzRDuQ__original/img/hM_5x6NHVIO4fOccB4ggsqbb2rY=/0x0/filters:format(jpeg)/pic5854330.jpg",
      selected: true,
    },
    {
      id: "244271",
      name: "Dice Throne: Season Two – Battle Chest",
      image:
        "https://cf.geekdo-images.com/lJkCMk1jwCl-KHSPZJCPZQ__thumb/img/93EGDw0NSm91SomXH38d4XvhlSk=/fit-in/200x150/filters:strip_icc()/pic4441140.jpg",
      fullSize:
        "https://cf.geekdo-images.com/lJkCMk1jwCl-KHSPZJCPZQ__original/img/sWgmSr0KiOvb3iGINSg-2huDnSk=/0x0/filters:format(jpeg)/pic4441140.jpg",
      selected: true,
    },
    {
      id: "209685",
      name: "Century: Spice Road",
      image:
        "https://cf.geekdo-images.com/0_KEDk4lCvryf1Ju3YQJxA__thumb/img/FticvQmaT_qfdrX-hpSSK1ttRb0=/fit-in/200x150/filters:strip_icc()/pic3339551.jpg",
      fullSize:
        "https://cf.geekdo-images.com/0_KEDk4lCvryf1Ju3YQJxA__original/img/zv58Iylm_N8nfVFgRkMVM0Q9Fh8=/0x0/filters:format(jpeg)/pic3339551.jpg",
      selected: true,
    },
    {
      id: "271324",
      name: "It&#039;s a Wonderful World",
      image:
        "https://cf.geekdo-images.com/od4vDTdXGPSVc-kjLqM11w__thumb/img/T2ukKoCUNv2LMxg5GOlOb8WTzNI=/fit-in/200x150/filters:strip_icc()/pic4651175.jpg",
      fullSize:
        "https://cf.geekdo-images.com/od4vDTdXGPSVc-kjLqM11w__original/img/sN8TnSkFGCzNM01b_drFxwYnqlM=/0x0/filters:format(jpeg)/pic4651175.jpg",
      selected: true,
    },
    {
      id: "181293",
      name: "Alien Artifacts",
      image:
        "https://cf.geekdo-images.com/bQ0n-lmFt6_V4fcC_Di2Yw__thumb/img/YiqXBG9h7G9E7Hd76AFLjKOKPm8=/fit-in/200x150/filters:strip_icc()/pic3671706.jpg",
      fullSize:
        "https://cf.geekdo-images.com/bQ0n-lmFt6_V4fcC_Di2Yw__original/img/23_WD9hYgxKAaTWfurtoPSYd46Y=/0x0/filters:format(jpeg)/pic3671706.jpg",
      selected: true,
    },
    {
      id: "266830",
      name: "QE",
      image:
        "https://cf.geekdo-images.com/47o_swlkRbfpMH3hnFZgtA__thumb/img/gT07BJ5Ynlopp-UIQRIySERKUmI=/fit-in/200x150/filters:strip_icc()/pic4383594.png",
      fullSize:
        "https://cf.geekdo-images.com/47o_swlkRbfpMH3hnFZgtA__original/img/V6-uacjfLFXQyOVHcLmEOVoZgf8=/0x0/filters:format(png)/pic4383594.png",
      selected: true,
    },
    {
      id: "146439",
      name: "BattleLore: Second Edition",
      image:
        "https://cf.geekdo-images.com/CWlHT1QMeB9hXaPcjE7cyw__thumb/img/_2T1jX4xfmE5cHdewuavWuqnmhw=/fit-in/200x150/filters:strip_icc()/pic1854807.jpg",
      fullSize:
        "https://cf.geekdo-images.com/CWlHT1QMeB9hXaPcjE7cyw__original/img/TgJq7DMgaMETYtlc4Img3AmyM00=/0x0/filters:format(jpeg)/pic1854807.jpg",
      selected: true,
    },
    {
      id: "363622",
      name: "The Castles of Burgundy: Special Edition",
      image:
        "https://cf.geekdo-images.com/JUrmY8GgFPQlENiPT7BGZw__thumb/img/Ftdtb0LiIqTAjpSlOVGnxdPaD9A=/fit-in/200x150/filters:strip_icc()/pic6884563.jpg",
      fullSize:
        "https://cf.geekdo-images.com/JUrmY8GgFPQlENiPT7BGZw__original/img/whCMdZhta-uXHgNJfVnetnjZueU=/0x0/filters:format(jpeg)/pic6884563.jpg",
      selected: true,
    },
    {
      id: "164928",
      name: "Orléans",
      image:
        "https://cf.geekdo-images.com/nagl1li6kYt9elV9jbfVQw__thumb/img/ykeqdM_Naz4IiqOgyB1arzteOiU=/fit-in/200x150/filters:strip_icc()/pic6228507.jpg",
      fullSize:
        "https://cf.geekdo-images.com/nagl1li6kYt9elV9jbfVQw__original/img/Qn6vlBaTUaHNFsqohIUjd0EA4z0=/0x0/filters:format(jpeg)/pic6228507.jpg",
      selected: true,
    },
    {
      id: "432",
      name: "6 nimmt!",
      image:
        "https://cf.geekdo-images.com/09d4xvqnrX6peFQWiFZVsA__thumb/img/nXNLrTgtPtOsc9o0xEjQEdehKtI=/fit-in/200x150/filters:strip_icc()/pic1491182.jpg",
      fullSize:
        "https://cf.geekdo-images.com/09d4xvqnrX6peFQWiFZVsA__original/img/HtNDLg71gd7zXHtKAzx7HnWnLbo=/0x0/filters:format(jpeg)/pic1491182.jpg",
      selected: true,
    },
    {
      id: "270844",
      name: "Imperial Settlers: Empires of the North",
      image:
        "https://cf.geekdo-images.com/w6HMeWkxsTJM6zC8oxwUfQ__thumb/img/g1qP3Gm2krXidqUYAJCS-xZVz0I=/fit-in/200x150/filters:strip_icc()/pic4543694.jpg",
      fullSize:
        "https://cf.geekdo-images.com/w6HMeWkxsTJM6zC8oxwUfQ__original/img/HTrXseY1Z66BC8QkdFgL2XUnA4A=/0x0/filters:format(jpeg)/pic4543694.jpg",
      selected: true,
    },
    {
      id: "28023",
      name: "Jamaica",
      image:
        "https://cf.geekdo-images.com/oKQavVW1n9sMpJ_J72fi7w__thumb/img/0h0JJS8sX0ralXVVSLTgnZc58iU=/fit-in/200x150/filters:strip_icc()/pic7681762.jpg",
      fullSize:
        "https://cf.geekdo-images.com/oKQavVW1n9sMpJ_J72fi7w__original/img/ehJM6inavmw2jmJ11SeSZLMpggQ=/0x0/filters:format(jpeg)/pic7681762.jpg",
      selected: true,
    },
    {
      id: "184921",
      name: "Bunny Kingdom",
      image:
        "https://cf.geekdo-images.com/Noz8-u1ba828WUv69pTXKg__thumb/img/17lnz18gnbQGnnTY8o07X2kxwbs=/fit-in/200x150/filters:strip_icc()/pic3613444.jpg",
      fullSize:
        "https://cf.geekdo-images.com/Noz8-u1ba828WUv69pTXKg__original/img/UsuOzkr2-QWs5KPyOhWS5s02Uug=/0x0/filters:format(jpeg)/pic3613444.jpg",
      selected: true,
    },
    {
      id: "354669",
      name: "Break the Cube",
      image:
        "https://cf.geekdo-images.com/zxoto_5p8qIXh0PB8uw73g__thumb/img/Ag_XvCI0GsToX0gMtsP5OMnAMs8=/fit-in/200x150/filters:strip_icc()/pic6624896.jpg",
      fullSize:
        "https://cf.geekdo-images.com/zxoto_5p8qIXh0PB8uw73g__original/img/JQI8fxhi09wRWK-X3JYqM3Q_AaA=/0x0/filters:format(jpeg)/pic6624896.jpg",
      selected: true,
    },
    {
      id: "160495",
      name: "ZhanGuo",
      image:
        "https://cf.geekdo-images.com/asueS9har0y10uk672cbGw__thumb/img/80v16ohwO4WQNiR6Yoo_9IHI2NY=/fit-in/200x150/filters:strip_icc()/pic2242246.jpg",
      fullSize:
        "https://cf.geekdo-images.com/asueS9har0y10uk672cbGw__original/img/nq95-sVAgp9Hc4nNi8UMrJt2LFw=/0x0/filters:format(jpeg)/pic2242246.jpg",
      selected: true,
    },
    {
      id: "173101",
      name: "Council of 4",
      image:
        "https://cf.geekdo-images.com/1PVwotn_MXzaG8aRWJBwLw__thumb/img/F8oR7WY_sXDfNAJKVmenGWQweQs=/fit-in/200x150/filters:strip_icc()/pic3252438.png",
      fullSize:
        "https://cf.geekdo-images.com/1PVwotn_MXzaG8aRWJBwLw__original/img/FS68rLI2D1N9rWwC-L8Iijx_6Ck=/0x0/filters:format(png)/pic3252438.png",
      selected: true,
    },
    {
      id: "144733",
      name: "Russian Railroads",
      image:
        "https://cf.geekdo-images.com/B0oEVgeqs4_rT8oyb1_Juw__thumb/img/oZkHYUMtcGVwg_gz6OjtuiD3vmU=/fit-in/200x150/filters:strip_icc()/pic1772936.jpg",
      fullSize:
        "https://cf.geekdo-images.com/B0oEVgeqs4_rT8oyb1_Juw__original/img/EnBmUkDKSbcBusI6nVRczadYs0M=/0x0/filters:format(jpeg)/pic1772936.jpg",
      selected: true,
    },
    {
      id: "21523",
      name: "Runebound: Second Edition",
      image:
        "https://cf.geekdo-images.com/9ihKYaEPIQD7d1KkTWfFpQ__thumb/img/JQGLbThEtF14BEuaf6RHi4cWm-4=/fit-in/200x150/filters:strip_icc()/pic178189.jpg",
      fullSize:
        "https://cf.geekdo-images.com/9ihKYaEPIQD7d1KkTWfFpQ__original/img/Tf_yZ6myNWnWkY6lyMvBvLU7g9s=/0x0/filters:format(jpeg)/pic178189.jpg",
      selected: true,
    },
    {
      id: "298572",
      name: "Cosmic Encounter Duel",
      image:
        "https://cf.geekdo-images.com/kroYzAvfIIwlO5N824qPzA__thumb/img/VGj1lpkgIBx-JR-d8dyeliMLk1c=/fit-in/200x150/filters:strip_icc()/pic6352686.jpg",
      fullSize:
        "https://cf.geekdo-images.com/kroYzAvfIIwlO5N824qPzA__original/img/uKJ-qYkr0t2OW_jTy_YJAjmphGg=/0x0/filters:format(jpeg)/pic6352686.jpg",
      selected: true,
    },
    {
      id: "257193",
      name: "Starcadia Quest",
      image:
        "https://cf.geekdo-images.com/UzOSmldhPAaIWEpFK-upbw__thumb/img/8N9Q6wK6ygNZ78yZxlBvrmQkuic=/fit-in/200x150/filters:strip_icc()/pic4258177.png",
      fullSize:
        "https://cf.geekdo-images.com/UzOSmldhPAaIWEpFK-upbw__original/img/4sSvK6A-U2ZlLnxU1RgQXzWZMOg=/0x0/filters:format(png)/pic4258177.png",
      selected: true,
    },
    {
      id: "371449",
      name: "The Key: Escape from Strongwall Prison",
      image:
        "https://cf.geekdo-images.com/_6VdW6L1bH1A4RBwFCwYdg__thumb/img/2746dFPuzc_xpHH_mcOsyvvBFYs=/fit-in/200x150/filters:strip_icc()/pic7665055.jpg",
      fullSize:
        "https://cf.geekdo-images.com/_6VdW6L1bH1A4RBwFCwYdg__original/img/eD3tjJmD24ThgunmfoOtwE2QTBU=/0x0/filters:format(jpeg)/pic7665055.jpg",
      selected: true,
    },
    {
      id: "293014",
      name: "Nidavellir",
      image:
        "https://cf.geekdo-images.com/PX7t5xXDLI2XqxoTShLayg__thumb/img/jV7kN2k9IkGKLhus2FJ5_VP9awc=/fit-in/200x150/filters:strip_icc()/pic5039625.jpg",
      fullSize:
        "https://cf.geekdo-images.com/PX7t5xXDLI2XqxoTShLayg__original/img/KYzd3fBTCxrRxEvNvzabNbll7Wg=/0x0/filters:format(jpeg)/pic5039625.jpg",
      selected: true,
    },
    {
      id: "346501",
      name: "Mille Fiori",
      image:
        "https://cf.geekdo-images.com/acERQjU6qQ_BGxF3IBri8w__thumb/img/AHl1ONikJsG3ZqNfow6E_nT0bh0=/fit-in/200x150/filters:strip_icc()/pic6703416.jpg",
      fullSize:
        "https://cf.geekdo-images.com/acERQjU6qQ_BGxF3IBri8w__original/img/knjL-l4xv88R0K-RXwSm_iAar-U=/0x0/filters:format(jpeg)/pic6703416.jpg",
      selected: true,
    },
    {
      id: "361545",
      name: "Twilight Inscription",
      image:
        "https://cf.geekdo-images.com/g36va6ofPCzNZXF-9GEpCg__thumb/img/F8SHn9giBPmooUkmJDz9kXAamS0=/fit-in/200x150/filters:strip_icc()/pic7132023.png",
      fullSize:
        "https://cf.geekdo-images.com/g36va6ofPCzNZXF-9GEpCg__original/img/W-Goi5-dQP19Nj-MXa8xdEtpnVs=/0x0/filters:format(png)/pic7132023.png",
      selected: true,
    },
    {
      id: "277700",
      name: "Merchants Cove",
      image:
        "https://cf.geekdo-images.com/-JD8JLncWYMes9Q6YIgorg__thumb/img/Ce6a64m5DxVae_ZXnAsrgdEnqBQ=/fit-in/200x150/filters:strip_icc()/pic6136538.jpg",
      fullSize:
        "https://cf.geekdo-images.com/-JD8JLncWYMes9Q6YIgorg__original/img/HkR7hlj4qqYD1oUvKXeyCLKjsKE=/0x0/filters:format(jpeg)/pic6136538.jpg",
      selected: true,
    },
    {
      id: "350184",
      name: "Earth",
      image:
        "https://cf.geekdo-images.com/0xqF_KyOb7V26Lu5YT3fxw__thumb/img/ABTwzzMGekkz2jVl01LC4789TcQ=/fit-in/200x150/filters:strip_icc()/pic6699821.jpg",
      fullSize:
        "https://cf.geekdo-images.com/0xqF_KyOb7V26Lu5YT3fxw__original/img/uqxMcj1QPt-U34drYdL6mmv2eos=/0x0/filters:format(jpeg)/pic6699821.jpg",
      selected: true,
    },
    {
      id: "365717",
      name: "Clank!: Catacombs",
      image:
        "https://cf.geekdo-images.com/cCLn9Mvb7jRSaZzHeUXhoQ__thumb/img/B8BFQLR2Po3ekI_7XSG1kR9oil0=/fit-in/200x150/filters:strip_icc()/pic6937913.jpg",
      fullSize:
        "https://cf.geekdo-images.com/cCLn9Mvb7jRSaZzHeUXhoQ__original/img/NK4hsA9nc-kdI07hR0Nc23dL_bk=/0x0/filters:format(jpeg)/pic6937913.jpg",
      selected: true,
    },
    {
      id: "109969",
      name: "Mutant Meeples",
      image:
        "https://cf.geekdo-images.com/aiCcef5a7n7gUOgTaznbwQ__thumb/img/fiE4O_v0fR5cVZ-GjY9Qa8fzQF0=/fit-in/200x150/filters:strip_icc()/pic1434137.jpg",
      fullSize:
        "https://cf.geekdo-images.com/aiCcef5a7n7gUOgTaznbwQ__original/img/UaG1q7e7_BUUnGdiTuZ-JCZsPXE=/0x0/filters:format(jpeg)/pic1434137.jpg",
      selected: true,
    },
    {
      id: "42215",
      name: "Tobago",
      image:
        "https://cf.geekdo-images.com/fuC2C10_6QK84R45Mseojw__thumb/img/bfp4x8H9nzQJQyNf2amKyx1BqUs=/fit-in/200x150/filters:strip_icc()/pic596625.jpg",
      fullSize:
        "https://cf.geekdo-images.com/fuC2C10_6QK84R45Mseojw__original/img/H3S1YSPe4O54yLV3W4G_zSTIiwU=/0x0/filters:format(jpeg)/pic596625.jpg",
      selected: true,
    },
    {
      id: "373759",
      name: "Monolyth",
      image:
        "https://cf.geekdo-images.com/r_VurIdvm1-kIuFjycNOew__thumb/img/ndwvPfD_Tb07PEm7S_BbRI6qljA=/fit-in/200x150/filters:strip_icc()/pic7149843.jpg",
      fullSize:
        "https://cf.geekdo-images.com/r_VurIdvm1-kIuFjycNOew__original/img/e1gKrdsE8ZIMNxXY1A-JE0IQJbQ=/0x0/filters:format(jpeg)/pic7149843.jpg",
      selected: true,
    },
    {
      id: "260605",
      name: "Camel Up (Second Edition)",
      image:
        "https://cf.geekdo-images.com/pRZrHJNoPQ3gay9EkpuZLw__thumb/img/e3Kn0hIHVIvWAE9m8IF7icNxw4s=/fit-in/200x150/filters:strip_icc()/pic4304741.jpg",
      fullSize:
        "https://cf.geekdo-images.com/pRZrHJNoPQ3gay9EkpuZLw__original/img/VHOeHhfYK3n-wYSP0G9RT26U0uQ=/0x0/filters:format(jpeg)/pic4304741.jpg",
      selected: true,
    },
    {
      id: "349463",
      name: "Dungeons, Dice &amp; Danger",
      image:
        "https://cf.geekdo-images.com/vv4ZUP_R3RYNjrqa4yPUdA__thumb/img/QCH8KqAmY8p5emEfdaF9fyXv9Pk=/fit-in/200x150/filters:strip_icc()/pic6616164.jpg",
      fullSize:
        "https://cf.geekdo-images.com/vv4ZUP_R3RYNjrqa4yPUdA__original/img/Rb0zyry1aNrPXCrAYFQG6qanTa4=/0x0/filters:format(jpeg)/pic6616164.jpg",
      selected: true,
    },
    {
      id: "180974",
      name: "Potion Explosion",
      image:
        "https://cf.geekdo-images.com/vwjYMFporFhvAU48k73MIw__thumb/img/uNBrY-gqZLq7aiv1E_pDsc3vmyE=/fit-in/200x150/filters:strip_icc()/pic7298696.jpg",
      fullSize:
        "https://cf.geekdo-images.com/vwjYMFporFhvAU48k73MIw__original/img/6sAfG89R42SJRv2wjiItRTMmcoQ=/0x0/filters:format(jpeg)/pic7298696.jpg",
      selected: true,
    },
    {
      id: "187645",
      name: "Star Wars: Rebellion",
      image:
        "https://cf.geekdo-images.com/7SrPNGBKg9IIsP4UQpOi8g__thumb/img/gAxzddRVQiRdjZHYFUZ2xc5Jlbw=/fit-in/200x150/filters:strip_icc()/pic4325841.jpg",
      fullSize:
        "https://cf.geekdo-images.com/7SrPNGBKg9IIsP4UQpOi8g__original/img/GKueTbkCk2Ramf6ai8mDj-BP6cI=/0x0/filters:format(jpeg)/pic4325841.jpg",
      selected: true,
    },
    {
      id: "342857",
      name: "Air, Land, and Sea: Critters at War",
      image:
        "https://cf.geekdo-images.com/sAOWDzYp6CDTzo2EHozkEw__thumb/img/XIGKrZEmkqKyrN24WXf7dIXq5ag=/fit-in/200x150/filters:strip_icc()/pic6293166.jpg",
      fullSize:
        "https://cf.geekdo-images.com/sAOWDzYp6CDTzo2EHozkEw__original/img/tKqqxNAS_ycVzfT5xseQGWHLE9s=/0x0/filters:format(jpeg)/pic6293166.jpg",
      selected: true,
    },
    {
      id: "55670",
      name: "Macao",
      image:
        "https://cf.geekdo-images.com/jLpm4EaABRAIN7F1Uakfaw__thumb/img/_DEcXV8qc02wb7cj20YIVtjDG1w=/fit-in/200x150/filters:strip_icc()/pic665651.jpg",
      fullSize:
        "https://cf.geekdo-images.com/jLpm4EaABRAIN7F1Uakfaw__original/img/sOEALnO3ZFAgPdQn5rTE7M4RuWs=/0x0/filters:format(jpeg)/pic665651.jpg",
      selected: true,
    },
    {
      id: "358557",
      name: "The Search for Lost Species",
      image:
        "https://cf.geekdo-images.com/-VyojGLJ9XYN1b-V2ODCHg__thumb/img/NbCa0ypa0yjqB7uTZKtOgCYcEqI=/fit-in/200x150/filters:strip_icc()/pic6740248.jpg",
      fullSize:
        "https://cf.geekdo-images.com/-VyojGLJ9XYN1b-V2ODCHg__original/img/Jbcp4I1cz_U8wlWZBrfaF0KTKDY=/0x0/filters:format(jpeg)/pic6740248.jpg",
      selected: true,
    },
    {
      id: "304783",
      name: "Hadrian&#039;s Wall",
      image:
        "https://cf.geekdo-images.com/4XzRDw3VrgNpNfZlzZl66w__thumb/img/dGMBL60RMtAfcx741phN75mqlnA=/fit-in/200x150/filters:strip_icc()/pic5608818.png",
      fullSize:
        "https://cf.geekdo-images.com/4XzRDw3VrgNpNfZlzZl66w__original/img/SfU1sNqUtpcvhcdzspDb5M9uSQQ=/0x0/filters:format(png)/pic5608818.png",
      selected: true,
    },
    {
      id: "312484",
      name: "Lost Ruins of Arnak",
      image:
        "https://cf.geekdo-images.com/6GqH14TJJhza86BX5HCLEQ__thumb/img/J8SVmGOJXZGxNjkT3xYNQU7Haxg=/fit-in/200x150/filters:strip_icc()/pic5674958.jpg",
      fullSize:
        "https://cf.geekdo-images.com/6GqH14TJJhza86BX5HCLEQ__original/img/CXqwimJPonWy1oyXEMgPN_ZVmUI=/0x0/filters:format(jpeg)/pic5674958.jpg",
      selected: true,
    },
    {
      id: "318009",
      name: "Dinosaur Island: Rawr &#039;n Write",
      image:
        "https://cf.geekdo-images.com/xRP9jo5gfwhfFkgxQBgWTw__thumb/img/Ax_lCMYmPvnu1qYP0-nRAjcVBO8=/fit-in/200x150/filters:strip_icc()/pic5622932.png",
      fullSize:
        "https://cf.geekdo-images.com/xRP9jo5gfwhfFkgxQBgWTw__original/img/h-5jmA7e2JrfO9DM9OKy0S2MDjw=/0x0/filters:format(png)/pic5622932.png",
      selected: true,
    },
    {
      id: "213549",
      name: "Spoils of War",
      image:
        "https://cf.geekdo-images.com/Vw62CDC6AuR5TbhBuJOr6w__thumb/img/o0DoCW0re44q0rik0UkRLHzCpnA=/fit-in/200x150/filters:strip_icc()/pic3536557.jpg",
      fullSize:
        "https://cf.geekdo-images.com/Vw62CDC6AuR5TbhBuJOr6w__original/img/uCw3_1Kcc-PUXedtKw5FfBHFfvU=/0x0/filters:format(jpeg)/pic3536557.jpg",
      selected: true,
    },
    {
      id: "194594",
      name: "Dice Forge",
      image:
        "https://cf.geekdo-images.com/4BTVGQWO0M9ayxyku3FW6Q__thumb/img/BWNtptZ90Cutx39I3Celuvirt78=/fit-in/200x150/filters:strip_icc()/pic3477004.jpg",
      fullSize:
        "https://cf.geekdo-images.com/4BTVGQWO0M9ayxyku3FW6Q__original/img/8G3m0Cc_y3Qa0jcFn4ynWTwOV3A=/0x0/filters:format(jpeg)/pic3477004.jpg",
      selected: true,
    },
    {
      id: "299702",
      name: "The Lost Code",
      image:
        "https://cf.geekdo-images.com/EZ-K0yIcppJ4ysjq63NlHQ__thumb/img/0iH_gggY6ppwiGurzed78bqf9zg=/fit-in/200x150/filters:strip_icc()/pic5194215.jpg",
      fullSize:
        "https://cf.geekdo-images.com/EZ-K0yIcppJ4ysjq63NlHQ__original/img/yD2lGcViK91BR0hJ3qIxihb59Og=/0x0/filters:format(jpeg)/pic5194215.jpg",
      selected: true,
    },
    {
      id: "349943",
      name: "Museum: Deluxe Edition",
      image:
        "https://cf.geekdo-images.com/VqFUoUbe0YAGYKgMYpaYFA__thumb/img/nqNTpa1qvZwlop4BlFqZX2-AFtA=/fit-in/200x150/filters:strip_icc()/pic7271550.jpg",
      fullSize:
        "https://cf.geekdo-images.com/VqFUoUbe0YAGYKgMYpaYFA__original/img/DmUp4vwT2b-kldrM3vPJaCIMM8w=/0x0/filters:format(jpeg)/pic7271550.jpg",
      selected: true,
    },
    {
      id: "176396",
      name: "Quadropolis",
      image:
        "https://cf.geekdo-images.com/y7kVtuCs6EfItCGUloqBAA__thumb/img/SGHJzA_0kYlRzeWTi5s_4JB_EPY=/fit-in/200x150/filters:strip_icc()/pic2840020.jpg",
      fullSize:
        "https://cf.geekdo-images.com/y7kVtuCs6EfItCGUloqBAA__original/img/vRPabR3wug71QB2mHCx-0BnairI=/0x0/filters:format(jpeg)/pic2840020.jpg",
      selected: true,
    },
    {
      id: "339789",
      name: "Welcome to the Moon",
      image:
        "https://cf.geekdo-images.com/eCdiHCB9OobumwaGl4dbOQ__thumb/img/dyaAIesMyeQWUoLRA25Dj9MhruI=/fit-in/200x150/filters:strip_icc()/pic6204967.png",
      fullSize:
        "https://cf.geekdo-images.com/eCdiHCB9OobumwaGl4dbOQ__original/img/U4DY7_OUE1XI1m1Fi0iubbf2sEI=/0x0/filters:format(png)/pic6204967.png",
      selected: true,
    },
    {
      id: "304668",
      name: "Robot Quest Arena",
      image:
        "https://cf.geekdo-images.com/th2mTX86BDEVlNfRKTQYCQ__thumb/img/8PnKC3ZJeML0cuUVhDVyFkBCikI=/fit-in/200x150/filters:strip_icc()/pic6189697.jpg",
      fullSize:
        "https://cf.geekdo-images.com/th2mTX86BDEVlNfRKTQYCQ__original/img/aWRfwOeoSVlapTqOZNKkxHXRhuc=/0x0/filters:format(jpeg)/pic6189697.jpg",
      selected: true,
    },
    {
      id: "177678",
      name: "Signorie",
      image:
        "https://cf.geekdo-images.com/Nq7RZa78giIv6IdfPWCMvQ__thumb/img/-CUyKUt1lFJjpivhset1eX0Swso=/fit-in/200x150/filters:strip_icc()/pic2684003.jpg",
      fullSize:
        "https://cf.geekdo-images.com/Nq7RZa78giIv6IdfPWCMvQ__original/img/Yu4EM1Xl6KgxdSrrROspBLMKn3U=/0x0/filters:format(jpeg)/pic2684003.jpg",
      selected: true,
    },
    {
      id: "143519",
      name: "Quantum",
      image:
        "https://cf.geekdo-images.com/Bgle3gjd2wTrD31ps_z92w__thumb/img/bjSkZpezCxJBqtucXslJAX2laKA=/fit-in/200x150/filters:strip_icc()/pic1727619.jpg",
      fullSize:
        "https://cf.geekdo-images.com/Bgle3gjd2wTrD31ps_z92w__original/img/VWKSSnMFxzSIdQ7W6hrdw_VCKmI=/0x0/filters:format(jpeg)/pic1727619.jpg",
      selected: true,
    },
    {
      id: "262712",
      name: "Res Arcana",
      image:
        "https://cf.geekdo-images.com/gcALy45JfcjyKUn6T3mBIQ__thumb/img/5cPMxq_X6VIO8l2t1_6H7C_KqrU=/fit-in/200x150/filters:strip_icc()/pic4422847.jpg",
      fullSize:
        "https://cf.geekdo-images.com/gcALy45JfcjyKUn6T3mBIQ__original/img/YLSAurBSWEGi3PHsuQWi8St_0Yg=/0x0/filters:format(jpeg)/pic4422847.jpg",
      selected: true,
    },
    {
      id: "342848",
      name: "World of Warcraft: Wrath of the Lich King",
      image:
        "https://cf.geekdo-images.com/uPTmPhITLCudIujyEwqkzg__thumb/img/AbWPDhWHyxEwDJIcWzn5lnZv7qA=/fit-in/200x150/filters:strip_icc()/pic6303509.jpg",
      fullSize:
        "https://cf.geekdo-images.com/uPTmPhITLCudIujyEwqkzg__original/img/xxePzI2HyAhnu_XtpteImG03PME=/0x0/filters:format(jpeg)/pic6303509.jpg",
      selected: true,
    },
    {
      id: "156566",
      name: "Lords of Xidit",
      image:
        "https://cf.geekdo-images.com/KluVg27eXcpbH-_lUWgyKA__thumb/img/DE3_O8NSQl9-RbBe_dIfjgo_bNo=/fit-in/200x150/filters:strip_icc()/pic2074460.jpg",
      fullSize:
        "https://cf.geekdo-images.com/KluVg27eXcpbH-_lUWgyKA__original/img/uRRKZ84K05gFSvffYPWRAFqazXI=/0x0/filters:format(jpeg)/pic2074460.jpg",
      selected: true,
    },
    {
      id: "7854",
      name: "YINSH",
      image:
        "https://cf.geekdo-images.com/t3wFvYaZuivPIrW6utaZOg__thumb/img/aHUfOu41P-grA7mGE7n85KMabKE=/fit-in/200x150/filters:strip_icc()/pic178413.jpg",
      fullSize:
        "https://cf.geekdo-images.com/t3wFvYaZuivPIrW6utaZOg__original/img/9IzpM7bbWbrj9-tDUkkhZ4udHv8=/0x0/filters:format(jpeg)/pic178413.jpg",
      selected: true,
    },
    {
      id: "147154",
      name: "Blue Moon Legends",
      image:
        "https://cf.geekdo-images.com/YaxwsOzTE1Qou7ZVn4x7vQ__thumb/img/wvw6SBUlzqCKJ9snFYm25zatQas=/fit-in/200x150/filters:strip_icc()/pic1854836.jpg",
      fullSize:
        "https://cf.geekdo-images.com/YaxwsOzTE1Qou7ZVn4x7vQ__original/img/sjaRKFdTOe5g3TRIeI_oUpjTRPg=/0x0/filters:format(jpeg)/pic1854836.jpg",
      selected: true,
    },
    {
      id: "328871",
      name: "Terraforming Mars: Ares Expedition",
      image:
        "https://cf.geekdo-images.com/eT_Atcy_vRJvuUMgYakNrQ__thumb/img/YxoNRQg9owsoi68POaMY0Ix31ZI=/fit-in/200x150/filters:strip_icc()/pic6260098.jpg",
      fullSize:
        "https://cf.geekdo-images.com/eT_Atcy_vRJvuUMgYakNrQ__original/img/upZwrb6k8zZMNTwB8VfpI372yuo=/0x0/filters:format(jpeg)/pic6260098.jpg",
      selected: true,
    },
    {
      id: "181524",
      name: "Masmorra: Dungeons of Arcadia",
      image:
        "https://cf.geekdo-images.com/OW2Xi0Mm7ZijLghZGJ7xLg__thumb/img/QKAenxinvreVYn45OQqlFZmpK24=/fit-in/200x150/filters:strip_icc()/pic2869709.png",
      fullSize:
        "https://cf.geekdo-images.com/OW2Xi0Mm7ZijLghZGJ7xLg__original/img/zJv2G0YLsQtbvFP0whBCN_Fbl_4=/0x0/filters:format(png)/pic2869709.png",
      selected: true,
    },
    {
      id: "124361",
      name: "Concordia",
      image:
        "https://cf.geekdo-images.com/30wkAlsclet02gYoF4POzQ__thumb/img/Xy4Lrp_Pdz9SU6TGKeErNjcWY2M=/fit-in/200x150/filters:strip_icc()/pic1980675.jpg",
      fullSize:
        "https://cf.geekdo-images.com/30wkAlsclet02gYoF4POzQ__original/img/cJtRh9SxWiWQgy2uFkIOkE9Awyg=/0x0/filters:format(jpeg)/pic1980675.jpg",
      selected: true,
    },
    {
      id: "233078",
      name: "Twilight Imperium: Fourth Edition",
      image:
        "https://cf.geekdo-images.com/_Ppn5lssO5OaildSE-FgFA__thumb/img/lfEukJE0JsoZZObaF9K9YnFp62E=/fit-in/200x150/filters:strip_icc()/pic3727516.jpg",
      fullSize:
        "https://cf.geekdo-images.com/_Ppn5lssO5OaildSE-FgFA__original/img/kVpZ0Maa_LeQGWxOqsYKP3N4KUY=/0x0/filters:format(jpeg)/pic3727516.jpg",
      selected: true,
    },
    {
      id: "463",
      name: "Magic: The Gathering",
      image:
        "https://cf.geekdo-images.com/CxJmNl4wR4InjqyNrMdBTw__thumb/img/TtlQgYxLTPyYQWJvruMHfwKPReE=/fit-in/200x150/filters:strip_icc()/pic163749.jpg",
      fullSize:
        "https://cf.geekdo-images.com/CxJmNl4wR4InjqyNrMdBTw__original/img/TKQgvl_i6zVYld8Gac8oU-c2ezE=/0x0/filters:format(jpeg)/pic163749.jpg",
      selected: true,
    },
    {
      id: "256999",
      name: "Project: ELITE",
      image:
        "https://cf.geekdo-images.com/5vp2W-DZ7waaaeZBFGF7LA__thumb/img/dd42jLxcgnHlvZdd0EOt8JZcUDI=/fit-in/200x150/filters:strip_icc()/pic5740623.jpg",
      fullSize:
        "https://cf.geekdo-images.com/5vp2W-DZ7waaaeZBFGF7LA__original/img/4KJD90WghLzp4Z4UNjDMsUDf6jA=/0x0/filters:format(jpeg)/pic5740623.jpg",
      selected: true,
    },
    {
      id: "324856",
      name: "The Crew: Mission Deep Sea",
      image:
        "https://cf.geekdo-images.com/VuBqZ1sMaDAVVHF_OEJP4g__thumb/img/EdacXlcFZ06YK0-ZKa0oKwL4VCw=/fit-in/200x150/filters:strip_icc()/pic5988903.jpg",
      fullSize:
        "https://cf.geekdo-images.com/VuBqZ1sMaDAVVHF_OEJP4g__original/img/jGWxczXC_VWZofeAmlO_DkB0hCI=/0x0/filters:format(jpeg)/pic5988903.jpg",
      selected: true,
    },
    {
      id: "356123",
      name: "Turing Machine",
      image:
        "https://cf.geekdo-images.com/un5yundwtC6q1U9gWTY8Yw__thumb/img/I4QR01ZS6TTIHgW3UpdOYvePRxQ=/fit-in/200x150/filters:strip_icc()/pic6883492.png",
      fullSize:
        "https://cf.geekdo-images.com/un5yundwtC6q1U9gWTY8Yw__original/img/wFqPVYmL1i9rc426afzYana7ZnE=/0x0/filters:format(png)/pic6883492.png",
      selected: true,
    },
    {
      id: "108745",
      name: "Seasons",
      image:
        "https://cf.geekdo-images.com/awmZ9rYy-hTgea6Vdp_OoQ__thumb/img/OBVCWq284XUhX2sKlMwoilFfuGk=/fit-in/200x150/filters:strip_icc()/pic1299390.jpg",
      fullSize:
        "https://cf.geekdo-images.com/awmZ9rYy-hTgea6Vdp_OoQ__original/img/bQ_yFa_JI_B8y3N4nfXcXYU_tE0=/0x0/filters:format(jpeg)/pic1299390.jpg",
      selected: true,
    },
    {
      id: "379078",
      name: "Expeditions",
      image:
        "https://cf.geekdo-images.com/9eBww9iAi472T2goijVqwQ__thumb/img/xR6PqvTMNBFaGlnN9WDAeIooBNM=/fit-in/200x150/filters:strip_icc()/pic7320023.jpg",
      fullSize:
        "https://cf.geekdo-images.com/9eBww9iAi472T2goijVqwQ__original/img/uvxTECY9yY2ONOllPgv7xLZCrGU=/0x0/filters:format(jpeg)/pic7320023.jpg",
      selected: true,
    },
    {
      id: "359962",
      name: "Redwood",
      image:
        "https://cf.geekdo-images.com/QSc9LqKsOY15owVLRTwbFQ__thumb/img/6hNsHAmB_2QkFeXoJrkgaUyWjV8=/fit-in/200x150/filters:strip_icc()/pic6958797.png",
      fullSize:
        "https://cf.geekdo-images.com/QSc9LqKsOY15owVLRTwbFQ__original/img/6VmNHLbjWYTd_LW-HnUzgfFTMCI=/0x0/filters:format(png)/pic6958797.png",
      selected: true,
    },
  ],
];

const isClient = typeof window !== "undefined";
interface Progress<T> {
  sorted: Array<Array<T> | T>;
  pivot: T;
  columns: Array<Array<T>>;
  current: Array<T>;
  worse: Array<T>;
  better: Array<T>;
  idx: number;
}

const isProgress = <T>(el: Progress<T>): el is Progress<T> => {
  return (
    "sorted" in el &&
    "pivot" in el &&
    "columns" in el &&
    "current" in el &&
    "worse" in el &&
    "better" in el &&
    "idx" in el
  );
};

export default function useQuickSort<T>(init: Array<T> | string) {
  let shuffled: Array<T> = [];
  if (Array.isArray(init)) {
    shuffled = shuffle(init);
  } else if (isClient) {
    const data = localStorage.getItem(init);
    if (data) {
      const parsed = JSON.parse(data);
      shuffled = shuffle(parsed);
    }
  }

  const [sorted, setSorted] = useState<Array<Array<T> | T>>(TEMPORARY_SORTED_JSON); // ex. [[ ... to be sorted ... ], sorted, sorted, [ ... tbs ... ], sorted, [ ... tbs ... ], etc.]
  const [pivot, setPivot] = useState<T>(TEMPORARY_CURRENT_JSON[0]); // item removed from current group to sort all against
  const [columns, setColumns] = useState<Array<Array<T>>>([[], []]);
  const [current, setCurrent] = useState<Array<T>>(TEMPORARY_CURRENT_JSON.slice(11)); // current group being sorted into the worse and better arrays
  const [worse, setWorse] = useState<Array<T>>([]); // items worse than pivot
  const [better, setBetter] = useState<Array<T>>([]); // items better than pivot
  const [idx, setIdx] = useState(0); // keeping track of the index in sorted to splice [worse, pivot, better] into once current is empty

  const router = useRouter();

  useEffect(() => {
    setColumns(calculateColumns(TEMPORARY_CURRENT_JSON.slice(1)));

    if (!isClient) return;

    const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    if (progress && isProgress<T>(progress)) {
      setSorted(progress.sorted);
      setPivot(progress.pivot);
      setColumns(progress.columns);
      setCurrent(progress.current);
      setWorse(progress.worse);
      setBetter(progress.better);
      setIdx(progress.idx);
    }
  }, []);

  const calculateColumns = (items: Array<T>) => {
    const lowerBound = Math.min(Math.ceil(items.length / 2), 5);
    const upperBound = lowerBound + Math.min(Math.floor(items.length / 2), 5);
    return [items.slice(0, lowerBound), items.slice(lowerBound, upperBound)];
  };

  const resetItems = () => {
    const allItems = [...worse, ...better, ...current, ...columns.flat(), pivot];
    const shuffled = shuffle(allItems.slice());
    const newColumns = calculateColumns(shuffled.slice(1));
    setWorse([]);
    setBetter([]);
    setColumns(newColumns);
    setPivot(shuffled[0]);
    setCurrent(shuffled.slice(11));
  };

  const sort = () => {
    setCurrent((curr) => {
      const columnItems = curr.slice(0, 10);

      if (columnItems.length > 0) {
        const copy = curr.slice(10);
        const newWorse = worse.slice().concat(columns[0]);
        const newBetter = better.slice().concat(columns[1]);
        const newColumns = calculateColumns(columnItems);
        setWorse(newWorse);
        setBetter(newBetter);
        setColumns(newColumns);
        if (isClient) {
          const progress: Progress<T> = {
            sorted,
            worse: newWorse,
            better: newBetter,
            idx,
            pivot,
            columns: newColumns,
            current: copy,
          };
          localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
        }
        return copy;
      } else {
        let sortedCopy = sorted.slice();
        sortedCopy.splice(
          idx,
          0,
          worse.concat(columns[0]),
          pivot,
          better.concat(columns[1])
        );
        sortedCopy = sortedCopy
          .filter((v) => (Array.isArray(v) ? v.length > 0 : true))
          .map((v) => (Array.isArray(v) && v.length === 1 ? v[0] : v));
        const nextIdx = sortedCopy.findIndex((v) => Array.isArray(v));
        if (nextIdx > -1) {
          const next = sortedCopy.splice(nextIdx, 1)[0] as Array<T>;
          const newColumns = calculateColumns(next.slice(1));
          if (isClient) {
            const progress: Progress<T> = {
              sorted: sortedCopy,
              worse: [],
              better: [],
              idx: nextIdx,
              pivot: next[0],
              columns: newColumns,
              current: next.slice(11),
            };
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
          }
          setSorted(sortedCopy);
          setWorse([]);
          setBetter([]);
          setIdx(nextIdx);
          setPivot(next[0]);
          setColumns(newColumns);
          return next.slice(11);
        } else {
          // DONE SORTING
          if (isClient) {
            localStorage.setItem(SAVED_KEY, JSON.stringify(sortedCopy));
            router.push("results");
          }
          return curr;
        }
      }
    });
  };

  const getStatus = () => {
    return {
      data: [
        ...sorted.slice(0, idx),
        worse,
        [pivot, ...current, ...columns.flat()],
        better,
        ...sorted.slice(idx),
      ],
      index: idx + 1,
    };
  };

  const swap = (from: number, to: number, fromIdx: number, toIdx: number) => {
    setColumns((curr) => {
      const copy = curr.slice();
      const spliced = copy[from].splice(fromIdx, 1);
      copy[to].splice(toIdx, 0, spliced[0]);
      return copy;
    });
  };

  return {
    pivot,
    resetItems,
    sort,
    getStatus,
    columns,
    swap,
  };
}
