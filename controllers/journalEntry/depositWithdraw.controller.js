import JournalEntryData from "../../models/journalEntry.model.js";

export const getDepositWithdraw = async (req, res) => {
  try {
    const allJournalEntry = await JournalEntryData.find();
    res.status(200).json(allJournalEntry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDepositWithdraw = async (req, res) => {
  // TODO: 하드코딩된 파라미터들 마스터데이터 컬렉션에서 읽어오는 것으로 수정 필요
  const clientData = req.body;
  console.log(clientData);

  // 전표번호 생성
  const numberOfDocuments = await JournalEntryData.countDocuments({
    documentType: clientData.documentType,
    documentDate: clientData.documentDate,
  });
  const documentNumber =
    (clientData.documentType === "deposit" ? "D-" : "W-") +
    clientData.documentDate.replace(/-/gi, "") +
    "-" +
    (numberOfDocuments + 1);

  // mongodb document 생성
  const debit = [];
  const credit = [];
  if (clientData.documentType === "deposit") {
    debit.push({ account: "11002", amount: clientData.amount }); // 보통예금
    credit.push({ account: clientData.account, amount: clientData.amount });
  } else if (clientData.documentType === "withdraw") {
    debit.push({
      account: clientData.account,
      amount: clientData.amount,
    });
    credit.push({ account: "11002", amount: clientData.amount }); // 보통예금
  }

  const journalEntryDocument = Object.assign(clientData, {
    documentNumber: documentNumber,    
    debit: debit,
    credit: credit,
  });

  const newJournalEntry = new JournalEntryData(journalEntryDocument);
  console.log(newJournalEntry);

  // mongodb document 저장
  try {
    await newJournalEntry.save();
    res.status(201).json(newJournalEntry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
